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
 * @module transactions/MosaicCreationTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';
import {
	BufferSize,
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	MosaicDefinitionTransactionBufferPackage,
	CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

import convert from '../coders/convert';

const MosaicCreationTransactionBuffer = MosaicDefinitionTransactionBufferPackage.main;
const EmbeddedMosaicCreationTransactionBuffer = MosaicDefinitionTransactionBufferPackage.embedded;
const MosaicPropertyBuffer = MosaicDefinitionTransactionBufferPackage.MosaicPropertyBuffer;

export default class MosaicCreationTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicCreationTransactionBufferData = MosaicCreationTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this._createBufferProperties(CommonBufferProperties);

		return new BufferProperties(MosaicCreationTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static loadEmbeddedFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var MosaicCreationTransactionBufferData = EmbeddedMosaicCreationTransactionBuffer.loadFromBinary(consumableBuffer);

		var BufferProperties = this._createBufferProperties(CommonEmbeddedBufferProperties);

		return new BufferProperties(MosaicCreationTransactionBufferData);
	}

	static loadEmbeddedFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadEmbeddedFromBinary(binary);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(mosaicCreationTransactionBuffer){
				super(mosaicCreationTransactionBuffer);
			}

			getMosaicNonce(){
				return this.bufferClass.getMosaicnonce();
			}
		
			getMosaicId(){
				return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getMosaicid());
			}
		
			getFlags(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getFlags());
			}
		
			getDivisibility(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getDivisibility());
			}
		
			getProperties(){
				var properties = this.bufferClass.getProperties();

				var propertiesData = [];

				for(var i = 0; i < properties.length; i++){
					var propertyData = {
						id : bufferUtils.buffer_to_uint(properties[i].id),
						value : bufferUtils.bufferArray_to_uint32Array(properties[i].value),
					};

					switch (propertyData.id) {
						case 2:
							propertyData.type = "duration";
							break;
					
						default:
							break;
					}

					propertiesData.push(propertyData);
				}

				return propertiesData;
			}

			getDuration(){
				const properties = this.getProperties();

				for(var i = 0; i < properties.length; i++){
					if(properties[i].id == 2){
						return properties[i].value;
					}
				}
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder {
			constructor() {
				super();
				this.flags = 0;
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x414d;
				this.nonce = 0;
			}

			addNonce(nonce) {
				this.nonce = nonce;
				return this;
			}

			addDuration(duration) {
				this.duration = duration;
				return this;
			}

			addDivisibility(divisibility) {
				this.divisibility = divisibility;
				return this;
			}

			addSupplyMutable() {
				this.flags += 1;
				return this;
			}

			addTransferability() {
				this.flags += 2;
				return this;
			}

			addLevyMutable() {
				this.flags += 4;
				return this;
			}

			addMosaicId(mosaicId) {
				this.mosaicId = mosaicId;
				return this;
			}

			setProperties(properties){
				this.properties = properties;
			}

			getSize(){
				return BufferSize.MosaicDefinitionBaseSize.main + ( BufferSize.MosaicProperty * this.properties.length);
			}

			build() {
				var mosaicCreationTransactionBuffer = new MosaicCreationTransactionBuffer();

				var properties = [];

				var mosaicPropertyBuffer = new MosaicPropertyBuffer();
				mosaicPropertyBuffer.setId(bufferUtils.uint_to_buffer(2 , 1)); // duration is ID 2
				mosaicPropertyBuffer.setValue(bufferUtils.uint32Array_to_bufferArray(this.duration));

				properties.push(mosaicPropertyBuffer);

				this.setProperties(properties);

				// does not need to be in order 
				mosaicCreationTransactionBuffer.setSize(bufferUtils.uint_to_buffer(this.getSize(), 4));
				mosaicCreationTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				mosaicCreationTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				mosaicCreationTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				mosaicCreationTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				mosaicCreationTransactionBuffer.setMosaicnonce(this.nonce);
				mosaicCreationTransactionBuffer.setMosaicid(bufferUtils.uint32Array_to_bufferArray(this.mosaicId));
				mosaicCreationTransactionBuffer.setFlags(bufferUtils.uint_to_buffer(this.flags, 1));
				mosaicCreationTransactionBuffer.setDivisibility(bufferUtils.uint_to_buffer(this.divisibility, 1));
				mosaicCreationTransactionBuffer.setProperties(properties);
			
				var bytes = mosaicCreationTransactionBuffer.serialize();

				return new MosaicCreationTransaction(bytes);
			}
		}

		return Builder;
	}
}
