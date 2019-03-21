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
import convert from '../coders/convert';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	AccountPropertiesEntityTypeTransactionBuffer,
	CommonBufferProperties} from '../buffers';

const TransactionTypePropertyModificationBuffer = AccountPropertiesEntityTypeTransactionBuffer.TransactionTypePropertyModificationBuffer;

export default class AccountPropertiesEntityTypeTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AccountPropertiesEntityTypeTransactionBufferData = AccountPropertiesEntityTypeTransactionBuffer.TransactionTypePropertyTransactionBuffer.loadFromBinary(consumableBuffer);

		return new this.BufferProperties(AccountPropertiesEntityTypeTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static get BufferProperties(){

		class BufferProperties extends CommonBufferProperties{
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

		return BufferProperties;
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x4350;
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
				var accountPropertiesEntityTypeTransactionBuffer = new AccountPropertiesEntityTypeTransactionBuffer.TransactionTypePropertyTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					
					var transactionTypePropertyModificationBuffer = new TransactionTypePropertyModificationBuffer();

					transactionTypePropertyModificationBuffer.setModificationtype(bufferUtils.uint_to_buffer(modification.modificationType, 1));
					transactionTypePropertyModificationBuffer.setValue(bufferUtils.uint_to_buffer(modification.value, 2));
					modificationsArray.push(transactionTypePropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesEntityTypeTransactionBuffer.setSize(bufferUtils.uint_to_buffer(122 + (3 * this.modifications.length), 4));
				accountPropertiesEntityTypeTransactionBuffer.setSignature("");
				accountPropertiesEntityTypeTransactionBuffer.setSigner("");
				accountPropertiesEntityTypeTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesEntityTypeTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesEntityTypeTransactionBuffer.setFee(bufferUtils.uintArray_to_bufferArray(this.fee, 4));
				accountPropertiesEntityTypeTransactionBuffer.setDeadline(bufferUtils.uintArray_to_bufferArray(this.deadline, 4));
				accountPropertiesEntityTypeTransactionBuffer.setPropertytype(bufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesEntityTypeTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesEntityTypeTransactionBuffer.serialize();

				return new AccountPropertiesEntityTypeTransaction(bytes);
			}
		}

		return Builder;
	}
}
