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

import VerifiableTransaction from './VerifiableTransaction';
import BaseBuilder from './BaseBuilder';
import {
    BufferUtils,
	ModifyMultisigAccountTransactionBufferPackage} from '../buffers';

import convert from '../coders/convert';

const MultisigModificationTransactionBuffer = ModifyMultisigAccountTransactionBufferPackage.main;
const EmbeddedMultisigModificationTransactionBuffer = ModifyMultisigAccountTransactionBufferPackage.embedded;
const CosignatoryModificationBuffer = ModifyMultisigAccountTransactionBufferPackage.CosignatoryModificationBuffer;

/**
 * @module transactions/MultisigModificationTransaction
 */
export default class MultisigModificationTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){
		return super.loadFromBinary(binary, MultisigModificationTransactionBuffer);
	}

	static loadEmbeddedFromBinary(binary){
		return super.loadEmbeddedFromBinary(binary, EmbeddedMultisigModificationTransactionBuffer);
	}

	static loadFromPayload(payload){
		return super.loadFromPayload(payload, MultisigModificationTransactionBuffer);
	}

	static loadEmbeddedFromPayload(payload){
		return super.loadEmbeddedFromPayload(payload, EmbeddedMultisigModificationTransactionBuffer);
	}

	static _createBufferProperties(ExtendingClass){

		return class BufferProperties extends ExtendingClass{
			constructor(multisigModificationTransactionBuffer){
				super(multisigModificationTransactionBuffer);
			}
		
			getMinRemovalDelta(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getMinremovaldelta());
			}
		
			getMinApprovalDelta(){
				return BufferUtils.buffer_to_uint(this.bufferClass.getMinapprovaldelta());
			}
		
			getModifications = () => {
				var modifications = this.bufferClass.getModifications();

				var modificationsData = [];

				for(var i = 0; i < modifications.length; i++){
					var modificationData = {
						type : BufferUtils.buffer_to_uint(modifications[i].modificationType),
						cosignatoryPublicKey : convert.uint8ToHex(modifications[i].cosignatoryPublicKey),
					};
					modificationsData.push(modificationData);
				}

				return modificationsData;
			}
		}
	}

	static get Builder() {
		class Builder extends BaseBuilder{
			constructor() {
				super();
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x4155;
			}

			addMinRemovalDelta(minRemovalDelta) {
				this.minRemovalDelta = minRemovalDelta;
				return this;
			}

			addMinApprovalDelta(minApprovalDelta) {
				this.minApprovalDelta = minApprovalDelta;
				return this;
			}

			addModifications(modifications) {
				this.modifications = modifications;
				return this;
			}

			build() {
				var multisigModificationTransactionBuffer = new MultisigModificationTransactionBuffer();

				const modificationsArray = [];
				this.modifications.forEach(modification => {
					const cosignatoryModificationBuffer = new CosignatoryModificationBuffer();

					cosignatoryModificationBuffer.setModificationtype(BufferUtils.uint_to_buffer(modification.type, 1));
					cosignatoryModificationBuffer.setCosignatorypublickey(convert.hexToUint8(modification.cosignatoryPublicKey));

					modificationsArray.push(cosignatoryModificationBuffer);
				});

				// does not need to be in order 
				multisigModificationTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(this.version, 2));
				multisigModificationTransactionBuffer.setType(BufferUtils.uint_to_buffer(this.type, 2));
				multisigModificationTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(this.fee));
				multisigModificationTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(this.deadline));
				multisigModificationTransactionBuffer.setMinremovaldelta(BufferUtils.uint_to_buffer(this.minRemovalDelta, 1));
				multisigModificationTransactionBuffer.setMinapprovaldelta(BufferUtils.uint_to_buffer(this.minApprovalDelta, 1));
				multisigModificationTransactionBuffer.setModifications(modificationsArray);

				var bytes = multisigModificationTransactionBuffer.serialize();

				return new MultisigModificationTransaction(bytes);
			}
		}

		return Builder;
	}
}
