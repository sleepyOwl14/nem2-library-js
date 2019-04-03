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
import BaseBuilder from './BaseBuilder';
import {
	BufferSize,
    bufferUtils,
	HashLockTransactionBufferPackage, 
	UnresolvedMosaicBuffer} from '../buffers';

import convert from '../coders/convert';

const HashLockTransactionBuffer = HashLockTransactionBufferPackage.main;
const EmbeddedHashLockTransactionBuffer = HashLockTransactionBufferPackage.embedded;

export default class HashLockTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, HashLockTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedHashLockTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, HashLockTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedHashLockTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(hashLockTransactionBufferData){
				super(hashLockTransactionBufferData);
			}
		
			getMosaic(){

				var mosaic = this.bufferClass.getMosaic();

				var mosaicData = {
					mosaicId : bufferUtils.bufferArray_to_uint32Array(mosaic.mosaicId),
					amount : bufferUtils.bufferArray_to_uint32Array(mosaic.amount),
				};

				return mosaicData;
			}

			getMosaicId(){
				return this.getMosaic().mosaicId;
			}

			getMosaicAmount(){
				return this.getMosaic().amount;
			}
		
			getDuration(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getDuration());
			}
		
			getHash(){
				return convert.uint8ToHex(this.bufferClass.getHash());
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder {
			constructor(){
				super();
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x414C;
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

			getSize(){
				return BufferSize.HashLockBaseSize.main + BufferSize.UnresolvedMosaic;
			}

			build() {

				var hashLockTransactionBuffer = new HashLockTransactionBuffer();

				var mosaicBuffer = new UnresolvedMosaicBuffer();

				mosaicBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicBuffer.setAmount(bufferUtils.uint32Array_to_bufferArray(this.mosaicAmount));

				// does not need to be in order 
				hashLockTransactionBuffer.setSize(bufferUtils.uint_to_buffer(this.getSize(), 4));
				hashLockTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				hashLockTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				hashLockTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				hashLockTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
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
