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
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	MosaicAliasTransactionBufferPackage, 
	UnresolvedMosaicBuffer,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

const MosaicAliasTransactionBuffer = MosaicAliasTransactionBufferPackage.main;
const EmbeddedMosaicAliasTransactionBuffer = MosaicAliasTransactionBufferPackage.embedded;

import convert from '../coders/convert';
/**
 * @module transactions/MosaicAliasTransaction
 */
export default class MosaicAliasTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicAliasTransactionBufferData = MosaicAliasTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(MosaicAliasTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicAliasTransactionBufferDataData = EmbeddedMosaicAliasTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(MosaicAliasTransactionBufferDataData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(mosaicAliasTransactionBufferDataData){
				super(mosaicAliasTransactionBufferDataData);
			}

			getAliasAction(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getAliasaction());
			}

			getNamespaceId(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getNamespaceid());
			}
		
			getMosaicId(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getMosaicid());
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
				mosaicAliasTransactionBuffer.setSize(bufferUtils.uint_to_buffer(137, 4));
				mosaicAliasTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				mosaicAliasTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				mosaicAliasTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				mosaicAliasTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));

				mosaicAliasTransactionBuffer.setAliasaction(bufferUtils.uint_to_buffer(this.actionType, 1));
				mosaicAliasTransactionBuffer.setNamespaceid(bufferUtils.uint32Array_to_bufferArray(this.namespaceId));
                mosaicAliasTransactionBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(this.mosaicId));
			
				var bytes = mosaicAliasTransactionBuffer.serialize();

				return new MosaicAliasTransaction(bytes);
			}
		}

		return Builder;
	}
}
