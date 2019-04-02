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
import BaseBuilder from './BaseBuilder';

import convert from '../coders/convert';
import {
	BufferSize,
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	MosaicPropertyTransactionBufferPackage,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

const MosaicPropertyModificationBuffer = MosaicPropertyTransactionBufferPackage.MosaicPropertyModificationBuffer;
const AccountPropertiesMosaicTransactionBuffer = MosaicPropertyTransactionBufferPackage.main;
const EmbeddedAccountPropertiesMosaicTransactionBuffer = MosaicPropertyTransactionBufferPackage.embedded;

export default class AccountPropertiesMosaicTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicPropertyTransactionBufferData = AccountPropertiesMosaicTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(MosaicPropertyTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicPropertyTransactionBufferData = EmbeddedAccountPropertiesMosaicTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(MosaicPropertyTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}
	
	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
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
						value : bufferUtils.bufferArray_to_uint32Array(modifications[i].value),
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
				this.type = 0x4250;
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
				return BufferSize.MosaicPropertyBaseSize.main + (BufferSize.MosaicPropertyModification * this.modifications.length);
			}

			build() {
				var accountPropertiesMosaicTransactionBuffer = new AccountPropertiesMosaicTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					
					var mosaicPropertyModificationBuffer = new MosaicPropertyModificationBuffer();

					mosaicPropertyModificationBuffer.setModificationtype(bufferUtils.uint_to_buffer(modification.modificationType, 1));
					mosaicPropertyModificationBuffer.setValue(bufferUtils.uint32Array_to_bufferArray(modification.value));
					modificationsArray.push(mosaicPropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesMosaicTransactionBuffer.setSize(bufferUtils.uint_to_buffer(this.getSize(), 4));
				accountPropertiesMosaicTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesMosaicTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesMosaicTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				accountPropertiesMosaicTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				accountPropertiesMosaicTransactionBuffer.setPropertytype(bufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesMosaicTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesMosaicTransactionBuffer.serialize();

				return new AccountPropertiesMosaicTransaction(bytes);
			}
		}

		return Builder;
	}
}
