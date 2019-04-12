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
    BufferUtils,
	MosaicSupplyChangeTransactionBufferPackage} from '../buffers';

const MosaicSupplyChangeTransactionBuffer = MosaicSupplyChangeTransactionBufferPackage.main;
const EmbeddedMosaicSupplyChangeTransactionBuffer = MosaicSupplyChangeTransactionBufferPackage.embedded;

/**
 * @module transactions/MosaicSupplyChangeTransaction
 */
export default class MosaicSupplyChangeTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, MosaicSupplyChangeTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedMosaicSupplyChangeTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, MosaicSupplyChangeTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedMosaicSupplyChangeTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(mosaicSupplyChangeTransactionBuffer){
				super(mosaicSupplyChangeTransactionBuffer);
			}

			getMosaicId(){
				return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getMosaicid());
			}

			getDirection(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getDirection());
			}
		
			getDelta(){
				return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getDelta());
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
				mosaicSupplyChangeTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				mosaicSupplyChangeTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				mosaicSupplyChangeTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				mosaicSupplyChangeTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				mosaicSupplyChangeTransactionBuffer.setMosaicid(BufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicSupplyChangeTransactionBuffer.setDirection(BufferUtils.uint_to_buffer(this.direction, 1));
				mosaicSupplyChangeTransactionBuffer.setDelta(BufferUtils.uint32Array_to_bufferArray(this.delta));
			
				var bytes = mosaicSupplyChangeTransactionBuffer.serialize();

				return new MosaicSupplyChangeTransaction(bytes);
			}
		}

		return Builder;
	}
}
