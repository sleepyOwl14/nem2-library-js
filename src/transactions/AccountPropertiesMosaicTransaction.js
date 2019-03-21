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
 * @module transactions/AccountPropertiesMosaicTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import convert from '../coders/convert';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	MosaicPropertyTransactionBuffer,
	CommonBufferProperties} from '../buffers';

const MosaicPropertyModificationBuffer = MosaicPropertyTransactionBuffer.MosaicPropertyModificationBuffer;

export default class AccountPropertiesMosaicTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicPropertyTransactionBufferData = MosaicPropertyTransactionBuffer.MosaicPropertyTransactionBuffer.loadFromBinary(consumableBuffer);

		return new this.BufferProperties(MosaicPropertyTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static get BufferProperties(){

		class BufferProperties extends CommonBufferProperties{
			constructor(accountPropertiesMosaicTransactionBuffer){
				super(accountPropertiesMosaicTransactionBuffer);
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
						value : bufferUtils.bufferArray_to_uintArray(modifications[i].value, 4),
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
				this.type = 0x4250;
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
				var accountPropertiesMosaicTransactionBuffer = new MosaicPropertyTransactionBuffer.MosaicPropertyTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					
					var mosaicPropertyModificationBuffer = new MosaicPropertyModificationBuffer();

					mosaicPropertyModificationBuffer.setModificationtype(bufferUtils.uint_to_buffer(modification.modificationType, 1));
					mosaicPropertyModificationBuffer.setValue(bufferUtils.uintArray_to_bufferArray(modification.value, 4));
					modificationsArray.push(mosaicPropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesMosaicTransactionBuffer.setSize(bufferUtils.uint_to_buffer(122 + (9 * this.modifications.length), 4));
				accountPropertiesMosaicTransactionBuffer.setSignature("");
				accountPropertiesMosaicTransactionBuffer.setSigner("");
				accountPropertiesMosaicTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesMosaicTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesMosaicTransactionBuffer.setFee(bufferUtils.uintArray_to_bufferArray(this.fee, 4));
				accountPropertiesMosaicTransactionBuffer.setDeadline(bufferUtils.uintArray_to_bufferArray(this.deadline, 4));
				accountPropertiesMosaicTransactionBuffer.setPropertytype(bufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesMosaicTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesMosaicTransactionBuffer.serialize();

				return new AccountPropertiesMosaicTransaction(bytes);
			}
		}

		return Builder;
	}
}
