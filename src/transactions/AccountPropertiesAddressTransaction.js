/*
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @module transactions/AccountPropertiesAddressTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';

import convert from '../coders/convert';

import {
    BufferUtils,
	AccountPropertiesAddressBufferPackage} from '../buffers';

const AddressPropertyModificationBuffer = AccountPropertiesAddressBufferPackage.AddressPropertyModificationBuffer;
const AccountPropertiesAddressTransactionBuffer = AccountPropertiesAddressBufferPackage.main;
const EmbeddedAccountPropertiesAddressTransactionBuffer = AccountPropertiesAddressBufferPackage.embedded;

const address = require('../coders/address').default;

export default class AccountPropertiesAddressTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, AccountPropertiesAddressTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedAccountPropertiesAddressTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, AccountPropertiesAddressTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedAccountPropertiesAddressTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(addressPropertyTransactionBuffer){
				super(addressPropertyTransactionBuffer);
			}
		
			getPropertyType(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getPropertytype());
			}
		
			getModifications(){
				var modifications = this.bufferClass.getModifications();

				var modificationsData = [];

				for(var i = 0; i < modifications.length; i++){
					var modification = {
						modificationType : BufferUtils.buffer_to_uint(modifications[i].modificationType),
						value : address.addressToString(modifications[i].value),
					};
					modificationsData.push(modification);
				}

				return modificationsData;
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder{
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x4150;
			}

			addPropertyType(propertyType) {
				this.propertyType = propertyType;
				return this;
			}

			addModifications(modifications) {
				this.modifications = modifications;
				return this;
			}

			build() {
				var accountPropertiesAddressTransactionBuffer = new AccountPropertiesAddressTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					
					var addressPropertyModificationBuffer = new AddressPropertyModificationBuffer();
					
					var addressString;

					if (/^[0-9a-fA-F]{16}$/.test(modification.value)) {
						// received hexadecimal notation
						addressString = address.aliasToRecipient(convert.hexToUint8(modification.value));
					} else {
						addressString = address.stringToAddress(modification.value);
					}

					addressPropertyModificationBuffer.setModificationtype(BufferUtils.uint_to_buffer(modification.modificationType));
					addressPropertyModificationBuffer.setValue(addressString);
					modificationsArray.push(addressPropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesAddressTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesAddressTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesAddressTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				accountPropertiesAddressTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				accountPropertiesAddressTransactionBuffer.setPropertytype(BufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesAddressTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesAddressTransactionBuffer.serialize();

				return new AccountPropertiesAddressTransaction(bytes);
			}
		}

		return Builder;
	}
}
