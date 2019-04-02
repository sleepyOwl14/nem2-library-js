/*
 * Copyright 2018 NEM
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
	MosaicSupplyChangeTransactionBufferPackage,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

import convert from '../coders/convert';

const MosaicSupplyChangeTransactionBuffer = MosaicSupplyChangeTransactionBufferPackage.main;
const EmbeddedMosaicSupplyChangeTransactionBuffer = MosaicSupplyChangeTransactionBufferPackage.embedded;

/**
 * @module transactions/MosaicSupplyChangeTransaction
 */
export default class MosaicSupplyChangeTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicSupplyChangeTransactionBufferData = MosaicSupplyChangeTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(MosaicSupplyChangeTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicSupplyChangeTransactionBufferData = EmbeddedMosaicSupplyChangeTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(MosaicSupplyChangeTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(mosaicSupplyChangeTransactionBuffer){
				super(mosaicSupplyChangeTransactionBuffer);
			}

			getMosaicId(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getMosaicid());
			}

			getDirection(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getDirection());
			}
		
			getDelta(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getDelta());
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder{
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x424d;
			}

			addMosaicId(mosaicId) {
				this.mosaicId = mosaicId;
				return this;
			}

			addDirection(direction) {
				this.direction = direction;
				return this;
			}

			addDelta(delta) {
				this.delta = delta;
				return this;
			}

			build() {
				var mosaicSupplyChangeTransactionBuffer = new MosaicSupplyChangeTransactionBuffer();

				// does not need to be in order 
				mosaicSupplyChangeTransactionBuffer.setSize(bufferUtils.uint_to_buffer(137 , 4));
				mosaicSupplyChangeTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				mosaicSupplyChangeTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				mosaicSupplyChangeTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				mosaicSupplyChangeTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				mosaicSupplyChangeTransactionBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicSupplyChangeTransactionBuffer.setDirection(bufferUtils.uint_to_buffer(this.direction, 1));
				mosaicSupplyChangeTransactionBuffer.setDelta(bufferUtils.uint32Array_to_bufferArray(this.delta));
			
				var bytes = mosaicSupplyChangeTransactionBuffer.serialize();

				return new MosaicSupplyChangeTransaction(bytes);
			}
		}

		return Builder;
	}
}
