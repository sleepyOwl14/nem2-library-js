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
 * @module transactions/AccountLinkTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import convert from '../coders/convert';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	AccountLinkTransactionBuffer, 
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

export default class AccountLinkTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AccountLinkTransactionBufferData = AccountLinkTransactionBuffer.AccountLinkTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(AccountLinkTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AccountLinkTransactionBufferData = AccountLinkTransactionBuffer.Embedded.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(AccountLinkTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(accountLinkTransactionBuffer){
				super(accountLinkTransactionBuffer);
			}

			getRemoteAccountKey(){
				return convert.uint8ToHex(this.bufferClass.getRemoteaccountkey());
			}
		
			getLinkAction(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getLinkaction());
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

			addRemoteAccountKey(remoteAccountKey) {
				this.remoteAccountKey = convert.hexToUint8(remoteAccountKey);
				return this;
			}

			addLinkAction(linkAction) {
				this.linkAction = linkAction;
				return this;
			}
			build() {

				var accountLinkTransactionBuffer = new AccountLinkTransactionBuffer.AccountLinkTransactionBuffer();

				// does not need to be in this order 
				accountLinkTransactionBuffer.setSize(bufferUtils.uint_to_buffer(154, 4));
				accountLinkTransactionBuffer.setSignature("");
				accountLinkTransactionBuffer.setSigner("");
				accountLinkTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				accountLinkTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				accountLinkTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				accountLinkTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				accountLinkTransactionBuffer.setRemoteaccountkey(this.remoteAccountKey);
				accountLinkTransactionBuffer.setLinkaction(bufferUtils.uint_to_buffer(this.linkAction,1));
			
				var bytes = accountLinkTransactionBuffer.serialize();

				return new AccountLinkTransaction(bytes);
			}
		}

		return Builder;
	}
}
