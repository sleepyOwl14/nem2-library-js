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
 * @module transactions/NamespaceCreationTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';
import {
	OptionalFieldSize,
	BufferSize,
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	RegisterNamespaceTransactionBufferPackage, 
	UnresolvedMosaicBuffer,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

import convert from '../coders/convert';

const NamespaceCreationTransactionBuffer = RegisterNamespaceTransactionBufferPackage.main;
const EmbeddedNamespaceCreationTransactionBuffer = RegisterNamespaceTransactionBufferPackage.embedded;
const NamespaceType = RegisterNamespaceTransactionBufferPackage.NamespaceType;

export default class NamespaceCreationTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var NamespaceCreationTransactionBufferData = NamespaceCreationTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this._createBufferProperties(CommonBufferProperties);

		return new BufferProperties(NamespaceCreationTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var NamespaceCreationTransactionBuffer = EmbeddedNamespaceCreationTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this._createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(NamespaceCreationTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(namespaceCreationTransactionBuffer){
				super(namespaceCreationTransactionBuffer);
			}
		
			getNamespaceType(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getNamespacetype());
			}
		
			getDuration(){

				var duration = this.bufferClass.getDuration();

				if(duration !== undefined){
					return bufferUtils.bufferArray_to_uint32Array(duration);
				}
				else{
					return null;
				}
			}
		
			getParentId(){
				var parentId = this.bufferClass.getParentid();

				if(parentId !== undefined){
					return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getParentid());
				}
				else{
					return null;
				}
			}
		
			getNamespaceId(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getNamespaceid());
			}
		
			getName(){
				return convert.hexToUtf8(convert.uint8ToHex(this.bufferClass.getName()));
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder{
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x414e;
			}

			addNamespaceType(namespaceType) {
				this.namespaceType = namespaceType;
				return this;
			}

			addDuration(duration) {
				this.duration = duration;
				return this;
			}

			addParentId(parentId) {
				this.parentId = parentId;
				return this;
			}

			addNamespaceId(namespaceId) {
				this.namespaceId = namespaceId;
				return this;
			}

			addNamespaceName(namespaceName) {
				this.namespaceName = namespaceName;
				return this;
			}

			getSize(){
				var namespaceNameLength = convert.utf8ToHex(this.namespaceName).length / 2;

				var additonalOptionalLength;

				switch (this.namespaceType) {
					case NamespaceType.root:
						additonalOptionalLength = OptionalFieldSize.RegisterNamespace.duration;
						break;
					case NamespaceType.child:
						additonalOptionalLength = OptionalFieldSize.RegisterNamespace.parentId;
						break;
				
					default:
						throw "Incorrect namespaceType added";
				}

				return BufferSize.RegisterNamespaceBaseSize.main + additonalOptionalLength + namespaceNameLength;
			}

			build() {			
				var namespaceCreationTransactionBuffer = new NamespaceCreationTransactionBuffer();
				// does not need to be in order 

				var namespaceNameLength = convert.utf8ToHex(this.namespaceName).length / 2;

				switch (this.namespaceType) {
					case NamespaceType.root:
						namespaceCreationTransactionBuffer.setDuration(bufferUtils.uint32Array_to_bufferArray(this.duration));
						break;
					case NamespaceType.child:
						namespaceCreationTransactionBuffer.setParentid(bufferUtils.uint32Array_to_bufferArray(this.parentId));
						break;
				
					default:
						throw "Incorrect namespaceType added";
				}

				namespaceCreationTransactionBuffer.setSize(bufferUtils.uint_to_buffer(this.getSize(), 4));
				namespaceCreationTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				namespaceCreationTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				namespaceCreationTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				namespaceCreationTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				namespaceCreationTransactionBuffer.setNamespacetype(bufferUtils.uint_to_buffer(this.namespaceType, 1));
				
				namespaceCreationTransactionBuffer.setNamespaceid(bufferUtils.uint32Array_to_bufferArray(this.namespaceId));
				namespaceCreationTransactionBuffer.setName(convert.hexToUint8(convert.utf8ToHex(this.namespaceName)));

				var bytes = namespaceCreationTransactionBuffer.serialize();

				return new NamespaceCreationTransaction(bytes);
			}
		}

		return Builder;
	}
}
