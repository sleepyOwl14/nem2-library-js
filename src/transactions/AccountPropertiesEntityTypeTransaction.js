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
 * @module transactions/AccountPropertiesEntityTypeTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';

import {
	BufferSize,
    bufferUtils,
	AccountPropertiesEntityTypeTransactionBufferPackage} from '../buffers';

const TransactionTypePropertyModificationBuffer = AccountPropertiesEntityTypeTransactionBufferPackage.TransactionTypePropertyModificationBuffer;
const AccountPropertiesEntityTypeTransactionBuffer = AccountPropertiesEntityTypeTransactionBufferPackage.main;
const EmbeddedAccountPropertiesEntityTypeTransactionBuffer = AccountPropertiesEntityTypeTransactionBufferPackage.embedded;

export default class AccountPropertiesEntityTypeTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, AccountPropertiesEntityTypeTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedAccountPropertiesEntityTypeTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, AccountPropertiesEntityTypeTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedAccountPropertiesEntityTypeTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(accountPropertiesEntityTypeTransactionBuffer){
				super(accountPropertiesEntityTypeTransactionBuffer);
			}
		
			getPropertyType(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getPropertytype());
			}
		
			getModifications(){
				var modifications = this.bufferClass.getModifications();

				var modificationsData = [];

				for(var i = 0; i < modifications.length; i++){
					var modification = {
						modificationType : bufferUtils.buffer_to_uint(modifications[i].modificationType),
						value : bufferUtils.buffer_to_uint(modifications[i].value),
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
				this.type = 0x4350;
			}

			addPropertyType(propertyType) {
				this.propertyType = propertyType;
				return this;
			}

			addModifications(modifications) {
				this.modifications = modifications;
				return this;
			}

			getSize(){
				return BufferSize.TransactionTypePropertyBaseSize.main + (BufferSize.TransactionTypePropertyModification * this.modifications.length);
			}

			build() {
				var accountPropertiesEntityTypeTransactionBuffer = new AccountPropertiesEntityTypeTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					
					var transactionTypePropertyModificationBuffer = new TransactionTypePropertyModificationBuffer();

					transactionTypePropertyModificationBuffer.setModificationtype(bufferUtils.uint_to_buffer(modification.modificationType, 1));
					transactionTypePropertyModificationBuffer.setValue(bufferUtils.uint_to_buffer(modification.value, 2));
					modificationsArray.push(transactionTypePropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesEntityTypeTransactionBuffer.setSize(bufferUtils.uint_to_buffer(this.getSize(), 4));
				accountPropertiesEntityTypeTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesEntityTypeTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesEntityTypeTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				accountPropertiesEntityTypeTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				accountPropertiesEntityTypeTransactionBuffer.setPropertytype(bufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesEntityTypeTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesEntityTypeTransactionBuffer.serialize();

				return new AccountPropertiesEntityTypeTransaction(bytes);
			}
		}

		return Builder;
	}
}
