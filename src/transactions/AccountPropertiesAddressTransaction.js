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
import convert from '../coders/convert';

import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	AccountPropertyAddressBuffer,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

const AddressPropertyModificationBuffer = AccountPropertyAddressBuffer.AddressPropertyModificationBuffer;

const address = require('../coders/address').default;

export default class AccountPropertiesAddressTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AccountPropertyAddressTransactionBufferData = AccountPropertyAddressBuffer.AddressPropertyTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(AccountPropertyAddressTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AccountPropertyAddressTransactionBufferData = AccountPropertyAddressBuffer.Embedded.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(AccountPropertyAddressTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(addressPropertyTransactionBuffer){
				super(addressPropertyTransactionBuffer);
			}
		
			getPropertyType(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getPropertyType());
			}
		
			getModifications(){
				var modifications = this.bufferClass.getModifications();

				var modificationsData = [];

				for(var i = 0; i < modifications.length; i++){
					var modification = {
						modificationType : bufferUtils.buffer_to_uint(modifications[i].modificationType),
						value : convert.uint8ToHex(modifications[i].value),
					};
					modificationsData.push(modification);
				}

				return modificationsData;
			}
		}
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x4150;
			}

			addFee(fee) {
				this.fee = fee;
				return this;
			}

			addVersion(version) {
				this.version = version;
				return this;
			}

			addType(type) {
				this.type = type;
				return this;
			}

			addDeadline(deadline) {
				this.deadline = deadline;
				return this;
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
				var accountPropertiesAddressTransactionBuffer = new AccountPropertyAddressBuffer.AddressPropertyTransactionBuffer();

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

					addressPropertyModificationBuffer.setModificationtype(bufferUtils.uint_to_buffer(modification.modificationType));
					addressPropertyModificationBuffer.setValue(addressString);
					modificationsArray.push(addressPropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesAddressTransactionBuffer.setSize(bufferUtils.uint_to_buffer(122 + (26 * this.modifications.length), 4));
				accountPropertiesAddressTransactionBuffer.setSignature("");
				accountPropertiesAddressTransactionBuffer.setSigner("");
				accountPropertiesAddressTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesAddressTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesAddressTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				accountPropertiesAddressTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				accountPropertiesAddressTransactionBuffer.setPropertytype(bufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesAddressTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesAddressTransactionBuffer.serialize();

				return new AccountPropertiesAddressTransaction(bytes);
			}
		}

		return Builder;
	}
}
