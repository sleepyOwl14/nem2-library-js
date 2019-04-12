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
import BaseBuilder from './BaseBuilder';
import {
    BufferUtils,
	SecretLockTransactionBufferPackage, 
	UnresolvedMosaicBuffer} from '../buffers';
import address from '../coders/address';
import convert from '../coders/convert';

const SecretLockTransactionBuffer = SecretLockTransactionBufferPackage.main;
const EmbeddedSecretLockTransactionBuffer = SecretLockTransactionBufferPackage.embedded;

export default class SecretLockTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, SecretLockTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedSecretLockTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, SecretLockTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedSecretLockTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(secretLockTransactionBuffer){
				super(secretLockTransactionBuffer);
			}

			getMosaic(){
				var mosaic = this.bufferClass.getMosaic();

				var mosaicData = {
					mosaicId : BufferUtils.bufferArray_to_uint32Array(mosaic.mosaicId),
					amount : BufferUtils.bufferArray_to_uint32Array(mosaic.amount),
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
				return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getDuration());
			}

			getHashAlgorithm(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getHashalgorithm());
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
		class Builder extends BaseBuilder {
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x424C;	
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

				mosaicBuffer.setMosaicid(BufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicBuffer.setAmount(BufferUtils.uint32Array_to_bufferArray(this.mosaicAmount));

				// does not need to be in order 
				secretLockTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				secretLockTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				secretLockTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				secretLockTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				secretLockTransactionBuffer.setMosaic(mosaicBuffer);
				secretLockTransactionBuffer.setDuration(BufferUtils.uint32Array_to_bufferArray(this.duration));
				secretLockTransactionBuffer.setHashalgorithm(BufferUtils.uint_to_buffer(this.hashAlgorithm, 1));
				secretLockTransactionBuffer.setSecret(convert.hexToUint8(this.secret));
				secretLockTransactionBuffer.setRecipient(this.recipient);
	
				var bytes = secretLockTransactionBuffer.serialize();

				return new SecretLockTransaction(bytes);
			}
		}

		return Builder;
	}
}
