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
import { sha3_256 } from 'js-sha3';
import SecretLockTransaction from '../../src/transactions/SecretLockTransaction';
import deadline from '../../src/transactions/Deadline';
import uint64 from '../../src/coders/uint64';
import convert from '../../src/coders/convert';

describe('SecretLockTransaction', () => {
	const keyPair = {
		publicKey: '9a49366406aca952b88badf5f1e9be6ce4968141035a60be503273ea65456b24',
		privateKey: '041e2ce90c31cd65620ed16ab7a5a485e5b335d7e61c75cd9b3a2fed3e091728'
	};

	it('should create secret lock transaction', () => {
		const hash = sha3_256.create();
		hash.update('secret');
		const secretLockTransaction = {
			deadline: deadline(),
			mosaicId: [3646934825, 3576016193],
			mosaicAmount: uint64.fromUint(10000000),
			duration: uint64.fromUint(100),
			hashAlgorithm: 0,
			secret: hash.hex(),
			recipient: 'SDUP5PLHDXKBX3UU5Q52LAY4WYEKGEWC6IB3VBFM'
		};
		const verifiableTransaction = new SecretLockTransaction.Builder()
			.addDeadline(secretLockTransaction.deadline)
			.addMosaicId(secretLockTransaction.mosaicId)
			.addMosaicAmount(secretLockTransaction.mosaicAmount)
			.addDuration(secretLockTransaction.duration)
			.addHashAlgorithm(secretLockTransaction.hashAlgorithm)
			.addSecret(secretLockTransaction.secret)
			.addRecipient(secretLockTransaction.recipient)
			.build();

		const transactionPayload = verifiableTransaction.signTransaction(keyPair);

		expect(transactionPayload.payload.substring(
			240,
			transactionPayload.payload.length
		)).to.be.equal('29CF5FD941AD25D58096980000000000640000000000000000' +
			'F5A5207A8729B1F709CB710311751EB2FC8ACAD5A1FB8AC991B736E69B6529A3' +
			'90E8FEBD671DD41BEE94EC3BA5831CB608A312C2F203BA84AC');

		const SecretLockTransactionBufferData = SecretLockTransaction.loadFromBinary(convert.hexToUint8(transactionPayload.payload));
		
		expect(SecretLockTransactionBufferData.getDeadline()).to.eql(secretLockTransaction.deadline);
		expect(SecretLockTransactionBufferData.getMosaicId()).to.eql(secretLockTransaction.mosaicId);
		expect(SecretLockTransactionBufferData.getMosaicAmount()).to.eql(secretLockTransaction.mosaicAmount);
		expect(SecretLockTransactionBufferData.getDuration()).to.be.eql(secretLockTransaction.duration);
		expect(SecretLockTransactionBufferData.getHashAlgorithm()).to.be.equal(secretLockTransaction.hashAlgorithm);
		expect(SecretLockTransactionBufferData.getSecret()).to.be.equal(secretLockTransaction.secret.toUpperCase());
		expect(SecretLockTransactionBufferData.getRecipient()).to.be.equal(secretLockTransaction.recipient);
	});
});
