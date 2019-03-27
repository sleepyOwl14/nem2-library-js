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

/**
 * @module transactions/HashLockTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	HashLockTransactionBuffer, 
	UnresolvedMosaicBuffer,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

import uint64 from '../../src/coders/uint64';
import convert from '../coders/convert';

export default class HashLockTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var HashLockTransactionBufferData = HashLockTransactionBuffer.HashLockTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(HashLockTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var HashLockTransactionBufferData = HashLockTransactionBuffer.Embedded.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(HashLockTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(hashLockTransactionBufferData){
				super(hashLockTransactionBufferData);
			}
		
			getMosaic(){

				var mosaic = this.bufferClass.getMosaic();

				var mosaicData = {
					mosaicId : uint64.fromBytes(mosaic.mosaicId),
					amount : uint64.fromBytes(mosaic.amount),
				};

				return mosaicData;
			}
		
			getDuration(){
				return uint64.fromBytes(this.bufferClass.getDuration());
			}
		
			getHash(){
				return convert.uint8ToHex(this.bufferClass.getHash());
			}
		}
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x414C;
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

			addMosaicId(mosaicId) {
				this.mosaicId = mosaicId;
				return this;
			}

			addMosaicAmount(mosaicAmount) {
				this.mosaicAmount = mosaicAmount;
				return this;
			}

			addDuration(duration) {
				this.duration = duration;
				return this;
			}

			addHash(hash) {
				this.hash = hash;
				return this;
			}

			build() {

				var hashLockTransactionBuffer = new HashLockTransactionBuffer.HashLockTransactionBuffer();

				var mosaicBuffer = new UnresolvedMosaicBuffer();

				mosaicBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicBuffer.setAmount(bufferUtils.uint32Array_to_bufferArray(this.mosaicAmount));

				// does not need to be in order 
				hashLockTransactionBuffer.setSize(bufferUtils.uint_to_buffer(176, 4));
				hashLockTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				hashLockTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				hashLockTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				hashLockTransactionBuffer.setDeadline(bufferUtils.uintArrayuint32Array_to_bufferArray_to_bufferArray(this.deadline));
				hashLockTransactionBuffer.setMosaic(mosaicBuffer);
				hashLockTransactionBuffer.setDuration(bufferUtils.uint32Array_to_bufferArray(this.duration));
				hashLockTransactionBuffer.setHash(convert.hexToUint8(this.hash));
			
				var bytes = hashLockTransactionBuffer.serialize();

				return new HashLockTransaction(bytes);
			}
		}

		return Builder;
	}
}
