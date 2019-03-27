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
 * @module transactions/AggregateTransaction
 */
import VerifiableTransaction from './VerifiableTransaction';
import CosignatureTransaction from './CosignatureTransaction';
import AccountLinkTransaction from './AccountLinkTransaction';
import AccountPropertiesAddressTransaction from './AccountPropertiesAddressTransaction';
import AccountPropertiesEntityTypeTransaction from './AccountPropertiesEntityTypeTransaction';
import AccountPropertiesMosaicTransaction from './AccountPropertiesMosaicTransaction';
import AddressAliasTransaction from './AddressAliasTransaction';
import HashLockTransaction from './HashLockTransaction';
import TransferTransaction from './TransferTransaction';
import MosaicAliasTransaction from './MosaicAliasTransaction';
import {
	Uint8ArrayConsumableBuffer,
    bufferUtils,
	AggregateTransactionBuffer, 
	UnresolvedMosaicBuffer,
	CommonBufferProperties} from '../buffers';

import convert from '../coders/convert';

export default class AggregateTransaction extends VerifiableTransaction {

	static loadFromBinary(binary){

		var consumableBuffer = new Uint8ArrayConsumableBuffer(binary);
		var AggregateTransactionBufferData = AggregateTransactionBuffer.AggregateTransactionBuffer.loadFromBinary(consumableBuffer);

		return new this.BufferProperties(AggregateTransactionBufferData);
	}

	static loadFromPayload(payload){

		var binary = convert.hexToUint8(payload);

		return this.loadFromBinary(binary);
	}

	static get BufferProperties(){

		class BufferProperties extends CommonBufferProperties{
			constructor(aggeragateTransactionBuffer){
				super(aggeragateTransactionBuffer);
			}
		
			getTransactionsSize(){
				return bufferUtils.buffer_to_uint(this.bufferClass.getTransactionsSize());
			}

			getTransactions(){
				var transactions = this.bufferClass.getTransactions();

				var transactionsData = [];

				for(var i = 0; i < transactions.length; i++){

					var transactionData;
					var transactionType = transactions[i].type;

					switch (transactionType) {
						case 0x414D:
							// Mosaic Definition
							break;

						case 0x424D:
							// Mosaic Supply Change
							break;

						case 0x414E:
							// Register Namespace
							break;

						case 0x424E:
							transactionData = AddressAliasTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							// Address Alias
							break;

						case 0x434E:
							// Mosaic Alias
							transactionData = MosaicAliasTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							break;

						case 0x4154:
							transactionData = TransferTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							// Transfer
							break;

						case 0x4155:
							// Modify Multisig Account
							break;

						case 0x4148:
							transactionData = HashLockTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							// Hash Lock
							break;

						case 0x4150:
							transactionData = AccountPropertiesAddressTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							// Account Properties Address 
							break;

						case 0x4250:
							transactionData = AccountPropertiesMosaicTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							// Account Properties Mosaic 
							break;

						case 0x4350:
							transactionData = AccountPropertiesEntityTypeTransaction.loadEmbeddedFromBinary( transactions[i].bytes );
							// Account Properties Entity Type 
							break;

						case 0x4152:

							// Secret Lock
							break;

						case 0x4252:

							// Secret Proof 
							break;

						case 0x414C:
							transactionData = AccountLinkTransaction.loadFromBinary( transactions[i].bytes );
							// Account Link
							break;

						default:
							break;
					}

					transactionsData.push(transactionData);
				}

				return transactionsData;
			}
		}

		return BufferProperties;
	}

	static get Builder() {
		class Builder {
			constructor() {
				this.fee = [0, 0];
				this.version = 36867;
				this.type = 0x4141;
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

			addTransactions(transactions) {
				let tmp = [];
				for (let i = 0; i < transactions.length; ++i)
					tmp = tmp.concat(transactions[i]);

				this.transactions = tmp;
				return this;
			}

			build() {

				var aggregateTransactionBuffer = new AggregateTransactionBuffer.AggregateTransactionBuffer();

				// does not need to be in order 
				aggregateTransactionBuffer.setSize(bufferUtils.uint_to_buffer(120 + 4 + this.transactions.length, 4));
				aggregateTransactionBuffer.setVersion(bufferUtils.uint_to_buffer(this.version, 2));
				aggregateTransactionBuffer.setType(bufferUtils.uint_to_buffer(this.type, 2));
				aggregateTransactionBuffer.setFee(bufferUtils.uint32Array_to_bufferArray(this.fee));
				aggregateTransactionBuffer.setDeadline(bufferUtils.uint32Array_to_bufferArray(this.deadline));
				aggregateTransactionBuffer.setTransactions(this.transactions);
			
				var bytes = aggregateTransactionBuffer.serializeAggregate();

				return new AggregateTransaction(bytes);
			}
		}

		return Builder;
	}

	signTransactionWithCosigners(initializer, cosigners) {
		const signedTransaction = this.signTransaction(initializer);
		cosigners.forEach(cosigner => {
			const signatureTransaction = new CosignatureTransaction(signedTransaction.hash);
			const signatureCosignTransaction = signatureTransaction.signCosignatoriesTransaction(cosigner);
			signedTransaction.payload = signedTransaction.payload + signatureCosignTransaction.signer + signatureCosignTransaction.signature;
		});

		// Calculate new size
		const size = `00000000${(signedTransaction.payload.length / 2).toString(16)}`;
		const formatedSize = size.substr(size.length - 8, size.length);
		const littleIndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

		signedTransaction.payload = littleIndianSize +
			signedTransaction.payload.substr(8, signedTransaction.payload.length - 8);

		return signedTransaction;
	}
}
