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
 * @module transactions/TransferTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	TransferTransactionBufferPackage, 
	UnresolvedMosaicBuffer,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

import convert from '../coders/convert';
const address = require('../coders/address').default;

const TransferTransactionBuffer = TransferTransactionBufferPackage.default;
const EmbeddedTransferTransactionBuffer = TransferTransactionBufferPackage.embedded;

export default class TransferTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var TransferTransactionBufferData = TransferTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonBufferProperties);

		return new BufferProperties(TransferTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var TransferTransactionBufferData = EmbeddedTransferTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this.createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(TransferTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(transferTransactionBuffer){
				super(transferTransactionBuffer);
			}
		
			getRecipient(){
				return address.addressToString(this.bufferClass.getRecipient());
			}
		
			getMessage(){
				var message = convert.hexToUtf8(convert.uint8ToHex(this.bufferClass.getMessage()));

				// remove the appended message type included in the message buffer
				return message.substr(1); 
			}
		
			getMosaics(){
				var mosaics = this.bufferClass.getMosaics();

				var mosaicsData = [];

				for(var i = 0; i < mosaics.length; i++){
					var mosaicData = {
						mosaicId : bufferUtils.bufferArray_to_uint32Array(mosaics[i].mosaicId),
						amount : bufferUtils.bufferArray_to_uint32Array(mosaics[i].amount),
					};
					mosaicsData.push(mosaicData);
				}

				return mosaicsData;
			}
		}
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x4154;
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

			addRecipient(recipient) {
				if (/^[0-9a-fA-F]{16}$/.test(recipient)) {
					// received hexadecimal notation of namespaceId (alias)
					this.recipient = address.aliasToRecipient(convert.hexToUint8(recipient));
				} else {
					// received recipient address
					this.recipient = address.stringToAddress(recipient);
				}
				return this;
			}

			addMessage(message) {
				this.message = message;
				return this;
			}

			addMosaics(mosaics) {
				this.mosaics = mosaics.sort((a, b) => {
					if (Number(a.id[1]) > b.id[1]) return 1;
					else if (a.id[1] < b.id[1]) return -1;
					return 0;
				});
				return this;
			}

			build() {
				var transferTransactionBuffer = new TransferTransactionBuffer();

				const mosaics = [];
				this.mosaics.forEach(mosaic => {
					var mosaicBuffer = new UnresolvedMosaicBuffer();

					mosaicBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(mosaic.id));
					mosaicBuffer.setAmount(bufferUtils.uint32Array_to_bufferArray(mosaic.amount));
					mosaics.push(mosaicBuffer);

				});

				var messagePayload = convert.hexToUint8(convert.utf8ToHex(this.message.payload));

				// extra byte for message type
				var bytePayload = bufferUtils.concat_typedarrays( Uint8Array.of([this.message.type]), messagePayload);
				

				// does not need to be in order 
				transferTransactionBuffer.setSize(bufferUtils.uint_to_buffer(148 + (16 * this.mosaics.length) + bytePayload.length, 4));
				transferTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				transferTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				transferTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				transferTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				transferTransactionBuffer.setRecipient(this.recipient);
				transferTransactionBuffer.setMessage(bytePayload);
				transferTransactionBuffer.setMosaics(mosaics);
			
				var bytes = transferTransactionBuffer.serialize();

				return new TransferTransaction(bytes);
			}

		}

		return Builder;
	}
}
