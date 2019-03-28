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
 * @module transactions/SecretLockTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	SecretLockTransactionBufferPackage, 
	UnresolvedMosaicBuffer,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';
import address from '../coders/address';
import uint64 from '../../src/coders/uint64';
import convert from '../coders/convert';

const SecretLockTransactionBuffer = SecretLockTransactionBufferPackage.default;
const EmbeddedSecretLockTransactionBuffer = SecretLockTransactionBufferPackage.embedded;

export default class SecretLockTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var SecretLockTransactionBufferData = SecretLockTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(SecretLockTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var SecretLockTransactionBufferData = EmbeddedSecretLockTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(SecretLockTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(secretLockTransactionBuffer){
				super(secretLockTransactionBuffer);
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
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getDuration());
			}

			getHashAlgorithm(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getHashalgorithm());
			}
		
			getSecret(){
				return convert.uint8ToHex(this.bufferClass.getSecret())
			}
		
			getRecipient(){
				return address.addressToString(this.bufferClass.getRecipient());
			}
		}
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x424C;
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

			addHashAlgorithm(hashAlgorithm) {
				this.hashAlgorithm = hashAlgorithm;
				return this;
			}

			addSecret(secret) {
				this.secret = secret;
				return this;
			}

			addRecipient(recipient) {
				this.recipient = address.stringToAddress(recipient);
				return this;
			}

			build() {
				var secretLockTransactionBuffer = new SecretLockTransactionBuffer();

				var mosaicBuffer = new UnresolvedMosaicBuffer();

				mosaicBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicBuffer.setAmount(bufferUtils.uint32Array_to_bufferArray(this.mosaicAmount));

				// does not need to be in order 
				secretLockTransactionBuffer.setSize(bufferUtils.uint_to_buffer(202, 4));
				secretLockTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				secretLockTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				secretLockTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				secretLockTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				secretLockTransactionBuffer.setMosaic(mosaicBuffer);
				secretLockTransactionBuffer.setDuration(bufferUtils.uint32Array_to_bufferArray(this.duration));
				secretLockTransactionBuffer.setHashalgorithm(bufferUtils.uint_to_buffer(this.hashAlgorithm, 1));
				secretLockTransactionBuffer.setSecret(convert.hexToUint8(this.secret));
				secretLockTransactionBuffer.setRecipient(this.recipient);
	
				var bytes = secretLockTransactionBuffer.serialize();

				return new SecretLockTransaction(bytes);
			}
		}

		return Builder;
	}
}
