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
    BufferUtils,
	RegisterNamespaceTransactionBufferPackage} from '../buffers';

import convert from '../coders/convert';

const NamespaceCreationTransactionBuffer = RegisterNamespaceTransactionBufferPackage.main;
const EmbeddedNamespaceCreationTransactionBuffer = RegisterNamespaceTransactionBufferPackage.embedded;
const NamespaceType = RegisterNamespaceTransactionBufferPackage.NamespaceType;

export default class NamespaceCreationTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, NamespaceCreationTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedNamespaceCreationTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(namespaceCreationTransactionBuffer){
				super(namespaceCreationTransactionBuffer);
			}
		
			getNamespaceType(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getNamespacetype());
			}
		
			getDuration(){

				var duration = this.bufferClass.getDuration();

				if(duration !== undefined){
					return BufferUtils.bufferArray_to_uint32Array(duration);
				}
				else{
					return null;
				}
			}
		
			getParentId(){
				var parentId = this.bufferClass.getParentid();

				if(parentId !== undefined){
					return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getParentid());
				}
				else{
					return null;
				}
			}
		
			getNamespaceId(){
				return BufferUtils.bufferArray_to_uint32Array(this.bufferClass.getNamespaceid());
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

			build() {			
				var namespaceCreationTransactionBuffer = new NamespaceCreationTransactionBuffer();
				// does not need to be in order 

				var namespaceNameLength = convert.utf8ToHex(this.namespaceName).length / 2;

				switch (this.namespaceType) {
					case NamespaceType.root:
						namespaceCreationTransactionBuffer.setDuration(BufferUtils.uint32Array_to_bufferArray(this.duration));
						break;
					case NamespaceType.child:
						namespaceCreationTransactionBuffer.setParentid(BufferUtils.uint32Array_to_bufferArray(this.parentId));
						break;
				
					default:
						throw "Incorrect namespaceType added";
				}

				namespaceCreationTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				namespaceCreationTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				namespaceCreationTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				namespaceCreationTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				namespaceCreationTransactionBuffer.setNamespacetype(BufferUtils.uint_to_buffer(this.namespaceType, 1));
				
				namespaceCreationTransactionBuffer.setNamespaceid(BufferUtils.uint32Array_to_bufferArray(this.namespaceId));
				namespaceCreationTransactionBuffer.setName(convert.hexToUint8(convert.utf8ToHex(this.namespaceName)));

				var bytes = namespaceCreationTransactionBuffer.serialize();

				return new NamespaceCreationTransaction(bytes);
			}
		}

		return Builder;
	}
}
