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
import convert from '../coders/convert';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	AddressAliasTransactionBuffer,
	CommonBufferProperties} from '../buffers';

const addressEncoder = require('../coders/address').default;

/**
 * @module transactions/AddressAliasTransaction
 */
export default class AddressAliasTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AddressAliasTransactionBufferData = AddressAliasTransactionBuffer.AddressAliasTransactionBuffer.loadFromBinary(consumableBuffer);

		return new this.BufferProperties(AddressAliasTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static get BufferProperties(){

		class BufferProperties extends CommonBufferProperties{
			constructor(addressAliasTransactionBuffer){
				super(addressAliasTransactionBuffer);
			}
		
			getAliasAction(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getAliasaction());
			}
		
			getNamespaceId(){
				return bufferUtils.bufferArray_to_uintArray(this.bufferClass.getNamespaceid(), 4);
			}
		
			getAddress(){
				return addressEncoder.addressToString(this.bufferClass.getAddress());
			}
		}

		return BufferProperties;
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x424E;
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

			addActionType(actionType) {
				this.actionType = actionType;
				return this;
			}

			addNamespaceId(namespaceId) {
				this.namespaceId = namespaceId;
				return this;
			}

			addAddress(address) {
				this.address = addressEncoder.stringToAddress(address);
				return this;
			}

			build() {

				var addressAliasTransactionBuffer = new AddressAliasTransactionBuffer.AddressAliasTransactionBuffer();

				addressAliasTransactionBuffer.setSize(bufferUtils.uint_to_buffer(154, 4));
				addressAliasTransactionBuffer.setSignature("");
				addressAliasTransactionBuffer.setSigner("");
				addressAliasTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				addressAliasTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				addressAliasTransactionBuffer.setFee(bufferUtils.uintArray_to_bufferArray(this.fee, 4));
				addressAliasTransactionBuffer.setDeadline(bufferUtils.uintArray_to_bufferArray(this.deadline, 4));
				addressAliasTransactionBuffer.setAliasaction(bufferUtils.uint_to_buffer(this.actionType));
				addressAliasTransactionBuffer.setNamespaceid(bufferUtils.uintArray_to_bufferArray(this.namespaceId, 4));
				addressAliasTransactionBuffer.setAddress(this.address);

				var bytes = addressAliasTransactionBuffer.serialize();

				return new AddressAliasTransaction(bytes);
			}
		}

		return Builder;
	}
}
