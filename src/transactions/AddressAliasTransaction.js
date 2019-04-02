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
import BaseBuilder from './BaseBuilder';

import convert from '../coders/convert';
import {
	BufferSize,
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	AddressAliasTransactionBufferPackage,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

const addressEncoder = require('../coders/address').default;

const AddressAliasTransactionBuffer = AddressAliasTransactionBufferPackage.main;
const EmbeddedAddressAliasTransactionBuffer = AddressAliasTransactionBufferPackage.embedded;
/**
 * @module transactions/AddressAliasTransaction
 */
export default class AddressAliasTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AddressAliasTransactionBufferData = AddressAliasTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this._createBufferProperties(CommonBufferProperties);

		return new BufferProperties(AddressAliasTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AddressAliasTransactionBufferData = EmbeddedAddressAliasTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this._createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(AddressAliasTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(addressAliasTransactionBuffer){
				super(addressAliasTransactionBuffer);
			}
		
			getAliasAction(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getAliasaction());
			}
		
			getNamespaceId(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getNamespaceid());
			}
		
			getAddress(){
				return addressEncoder.addressToString(this.bufferClass.getAddress());
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder{
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36865;
				this.type = 0x424E;
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

			getSize(){
				return BufferSize.AddressAliasBaseSize.main;
			}

			build() {

				var addressAliasTransactionBuffer = new AddressAliasTransactionBuffer();

				addressAliasTransactionBuffer.setSize(bufferUtils.uint_to_buffer(this.getSize(), 4));
				addressAliasTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				addressAliasTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				addressAliasTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				addressAliasTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				addressAliasTransactionBuffer.setAliasaction(bufferUtils.uint_to_buffer(this.actionType));
				addressAliasTransactionBuffer.setNamespaceid(bufferUtils.uint32Array_to_bufferArray(this.namespaceId));
				addressAliasTransactionBuffer.setAddress(this.address);

				var bytes = addressAliasTransactionBuffer.serialize();

				return new AddressAliasTransaction(bytes);
			}
		}

		return Builder;
	}
}
