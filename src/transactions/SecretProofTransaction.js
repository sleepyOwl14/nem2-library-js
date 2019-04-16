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
 * @module transactions/SecretProofTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';
import {
    BufferUtils,
	SecretProofTransactionBufferPackage} from '../buffers';
import convert from '../coders/convert';

const SecretProofTransactionBuffer = SecretProofTransactionBufferPackage.main;
const EmbeddedSecretProofTransactionBuffer = SecretProofTransactionBufferPackage.embedded;

export default class SecretProofTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, SecretProofTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedSecretProofTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(secretProofTransactionBuffer){
				super(secretProofTransactionBuffer);
			}

			getHashAlgorithm(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getHashalgorithm());
			}
		
			getSecret(){
				return convert.uint8ToHex(this.bufferClass.getSecret());
			}
		
			getProof(){
				return convert.uint8ToHex(this.bufferClass.getProof());
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder{
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x434C;
			}

			addHashAlgorithm(hashAlgorithm) {
				this.hashAlgorithm = hashAlgorithm;
				return this;
			}

			addSecret(secret) {
				this.secret = secret;
				return this;
			}

			addProof(proof) {
				this.proof = proof;
				return this;
			}

			setByteProof(byteProof){
				this.byteProof = byteProof;
			}

			build() {
				var secretProofTransactionBuffer = new SecretProofTransactionBuffer();

				this.setByteProof(convert.hexToUint8(this.proof));
				// does not need to be in order 
				secretProofTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				secretProofTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				secretProofTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				secretProofTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				
				secretProofTransactionBuffer.setHashalgorithm(BufferUtils.uint_to_buffer(this.hashAlgorithm, 1));
				secretProofTransactionBuffer.setSecret(convert.hexToUint8(this.secret));
				secretProofTransactionBuffer.setProof(this.byteProof);
	
				var bytes = secretProofTransactionBuffer.serialize();

				return new SecretProofTransaction(bytes);
			}
		}

		return Builder;
	}
}
