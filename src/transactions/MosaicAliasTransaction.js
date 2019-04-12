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

import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';
import {
    BufferUtils,
	MosaicAliasTransactionBufferPackage} from '../buffers';

const MosaicAliasTransactionBuffer = MosaicAliasTransactionBufferPackage.main;
const EmbeddedMosaicAliasTransactionBuffer = MosaicAliasTransactionBufferPackage.embedded;

/**
 * @module transactions/MosaicAliasTransaction
 */
export default class MosaicAliasTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, MosaicAliasTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedMosaicAliasTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, MosaicAliasTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedMosaicAliasTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(mosaicAliasTransactionBufferDataData){
				super(mosaicAliasTransactionBufferDataData);
			}

			getAliasAction(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getAliasaction());
			}

			getNamespaceId(){
				return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getNamespaceid());
			}
		
			getMosaicId(){
				return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getMosaicid());
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder {
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x434E;
			}

			addActionType(actionType) {
				this.actionType = actionType;
				return this;
			}

			addNamespaceId(namespaceId) {
				this.namespaceId = namespaceId;
				return this;
			}

			addMosaicId(mosaicId) {
				this.mosaicId = mosaicId;
				return this;
			}
			
			build() {

				var mosaicAliasTransactionBuffer = new MosaicAliasTransactionBuffer();
				// does not need to be in order 
				mosaicAliasTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				mosaicAliasTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				mosaicAliasTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				mosaicAliasTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));

				mosaicAliasTransactionBuffer.setAliasaction(BufferUtils.uint_to_buffer(this.actionType, 1));
				mosaicAliasTransactionBuffer.setNamespaceid(BufferUtils.uint32Array_to_bufferArray(this.namespaceId));
                mosaicAliasTransactionBuffer.setMosaicid(BufferUtils.uint32Array_to_bufferArray(this.mosaicId));
			
				var bytes = mosaicAliasTransactionBuffer.serialize();

				return new MosaicAliasTransaction(bytes);
			}
		}

		return Builder;
	}
}
