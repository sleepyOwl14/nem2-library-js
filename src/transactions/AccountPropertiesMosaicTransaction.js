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

import {
    BufferUtils,
	MosaicPropertyTransactionBufferPackage} from '../buffers';

const MosaicPropertyModificationBuffer = MosaicPropertyTransactionBufferPackage.MosaicPropertyModificationBuffer;
const AccountPropertiesMosaicTransactionBuffer = MosaicPropertyTransactionBufferPackage.main;
const EmbeddedAccountPropertiesMosaicTransactionBuffer = MosaicPropertyTransactionBufferPackage.embedded;

export default class AccountPropertiesMosaicTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, AccountPropertiesMosaicTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedAccountPropertiesMosaicTransactionBuffer);
	}
	
	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(accountPropertiesMosaicTransactionBuffer){
				super(accountPropertiesMosaicTransactionBuffer);
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
						value : BufferUtils.bufferArray_to_uint32Array(modifications[i].value),
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

			build() {
				var accountPropertiesMosaicTransactionBuffer = new AccountPropertiesMosaicTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					
					var mosaicPropertyModificationBuffer = new MosaicPropertyModificationBuffer();

					mosaicPropertyModificationBuffer.setModificationtype(BufferUtils.uint_to_buffer(modification.modificationType, 1));
					mosaicPropertyModificationBuffer.setValue(BufferUtils.uint32Array_to_bufferArray(modification.value));
					modificationsArray.push(mosaicPropertyModificationBuffer);
				});

				// does not need to be in order 
				accountPropertiesMosaicTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				accountPropertiesMosaicTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				accountPropertiesMosaicTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				accountPropertiesMosaicTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				accountPropertiesMosaicTransactionBuffer.setPropertytype(BufferUtils.uint_to_buffer(this.propertyType,1));
				accountPropertiesMosaicTransactionBuffer.setModifications(modificationsArray);
			
				var bytes = accountPropertiesMosaicTransactionBuffer.serialize();

				return new AccountPropertiesMosaicTransaction(bytes);
			}
		}

		return Builder;
	}
}
