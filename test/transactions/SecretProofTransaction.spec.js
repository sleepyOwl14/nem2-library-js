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

import { sha3_512 } from 'js-sha3';
import expect from 'expect.js';
import SecretProofTransaction from '../../src/transactions/SecretProofTransaction';
import deadline from '../../src/transactions/Deadline';

describe('SecretProofTransaction', () => {
	const keyPair = {
		publicKey: '9a49366406aca952b88badf5f1e9be6ce4968141035a60be503273ea65456b24',
		privateKey: '041e2ce90c31cd65620ed16ab7a5a485e5b335d7e61c75cd9b3a2fed3e091728'
	};

	it('should create secret lock transaction', () => {
		const hash = sha3_512.create();
		hash.update('secret');
		const secretProofTransaction = {
			deadline: deadline(),
			hashAlgorithm: 0,
			secret: hash.hex(),
			proof: '9a493664'
		};
		const verifiableTransaction = new SecretProofTransaction.Builder()
			.addDeadline(secretProofTransaction.deadline)
			.addHashAlgorithm(secretProofTransaction.hashAlgorithm)
			.addSecret(secretProofTransaction.secret)
			.addProof(secretProofTransaction.proof)
			.build();

		const transactionPayload = verifiableTransaction.signTransaction(keyPair);

		expect(transactionPayload.payload.substring(
			240,
			transactionPayload.payload.length
		)).to.be.equal('00B778A39A3663719DFC5E48C9D78431B1E45C2AF9DF538782BF199C189DABEAC7' +
			'680ADA57DCEC8EEE91C4E3BF3BFA9AF6FFDE90CD1D249D1C6121D7B759A001B104009A493664');
	});
});
