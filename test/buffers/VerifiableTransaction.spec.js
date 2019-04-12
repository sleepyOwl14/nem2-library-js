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

import expect from 'expect.js';
import VerifiableTransactionBuilder from '../../src/transactions/VerificableTransactionBuilder';
import {TransferTransactionBufferPackage, UnresolvedMosaicBuffer, BufferUtils} from '../../src/buffers';

import convert from '../../src/coders/convert';

const transfer = require('../../resources/request_before_sign.json');

describe('VerifiableTransaction', () => {
	let keyPair;

	before(() => {
		keyPair = {
			publicKey: 'eb6839c7e6bd0031fdd5f8cb5137e9bc950d7ee7756c46b767e68f3f58c24390',
			privateKey: '8a39b9dc5e2f15ecffdba41ffaab477857a30c9adc3993ec1721bafd0752e5cb'
		};
	});

	it('it should return a SignerFacade', () => {
		const verifiableTransaction = new VerifiableTransactionBuilder()
			.addTransaction(() => {

				var transferTransactionBuffer = new TransferTransactionBufferPackage.main();

				const mosaics = [];
				transfer.mosaics.forEach(mosaic => {
					var mosaicBuffer = new UnresolvedMosaicBuffer();

					mosaicBuffer.setMosaicid(BufferUtils.uint32Array_to_bufferArray(mosaic.id));
					mosaicBuffer.setAmount(BufferUtils.uint32Array_to_bufferArray(mosaic.amount));
					mosaics.push(mosaicBuffer);

				});

				var bytePayload = transfer.message.payload;

				// extra byte for message type
				if(bytePayload.length == 0){
					bytePayload = Uint8Array.of([transfer.message.type]);
				}
				else{
					bytePayload = BufferUtils.concat_typedarrays( Uint8Array.of([transfer.message.type]), bytePayload);
				}

				// does not need to be in order 
				transferTransactionBuffer.setSize(BufferUtils.uint_to_buffer(148 + (16 * transfer.mosaics.length) + bytePayload.length, 4));
				transferTransactionBuffer.setVersion(BufferUtils.uint_to_buffer(transfer.version, 2));
				transferTransactionBuffer.setType(BufferUtils.uint_to_buffer(transfer.type, 2));
				transferTransactionBuffer.setFee(BufferUtils.uint32Array_to_bufferArray(transfer.fee));
				transferTransactionBuffer.setDeadline(BufferUtils.uint32Array_to_bufferArray(transfer.deadline));
				transferTransactionBuffer.setRecipient(transfer.recipient);
				transferTransactionBuffer.setMessage(bytePayload);
				transferTransactionBuffer.setMosaics(mosaics);
			
				var bytes = transferTransactionBuffer.serialize();

				return bytes;
			})
			.build();

		expect(verifiableTransaction.signTransaction(keyPair).payload)
			.to.be.equal('A6000000DD964D671FE6E4E435146EAC50148016FC97A3AA837355475F2C53FFF291AF' +
			'4BDB1F1EFEB8B05EF6DF532C6F1C1197F6E5B94B406EE15F6A033E88E444FE1008EB6839C7E6BD0031F' +
			'DD5F8CB5137E9BC950D7EE7756C46B767E68F3F58C2439003900141000000000000000045A40ECB0A00' +
			'000090E8FEBD671DD41BEE94EC3BA5831CB608A312C2F203BA84AC020001000029CF5FD941AD25D5809' +
			'6980000000000');
	});
});
