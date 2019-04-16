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

import expect from 'expect.js';
import AccountPropertiesAddressTransaction from '../../src/transactions/AccountPropertiesAddressTransaction';
import deadline from '../../src/transactions/Deadline';
import convert from '../../src/coders/convert';

describe('AccountPropertiesAddressTransaction', () => {
	const keyPair = {
		publicKey: '9a49366406aca952b88badf5f1e9be6ce4968141035a60be503273ea65456b24',
		privateKey: '041e2ce90c31cd65620ed16ab7a5a485e5b335d7e61c75cd9b3a2fed3e091728'
	};

	it('should create account property address transaction', () => {
		const accountPropertiesAddressTransaction = {
			deadline: deadline(),
			propertyType: 0x01,
			modificationCount: 1,
			modifications: [{ modificationType: 0, value: 'SDUP5PLHDXKBX3UU5Q52LAY4WYEKGEWC6IB3VBFM' }]
		};

		const transaction = new AccountPropertiesAddressTransaction.Builder()
			.addDeadline(accountPropertiesAddressTransaction.deadline)
			.addPropertyType(accountPropertiesAddressTransaction.propertyType)
			.addModifications(accountPropertiesAddressTransaction.modifications)
			.build();

		const transactionPayload = transaction.signTransaction(keyPair);
		expect(transactionPayload.payload.substring(240, transactionPayload.payload.length))
			.to.be.equal('01010090E8FEBD671DD41BEE94EC3BA5831CB608A312C2F203BA84AC');

		const AccountPropertiesAddressTransactionBufferData = AccountPropertiesAddressTransaction.loadFromBinary(convert.hexToUint8(transactionPayload.payload));
		
		expect(AccountPropertiesAddressTransactionBufferData.getDeadline()).to.eql(accountPropertiesAddressTransaction.deadline);
		expect(AccountPropertiesAddressTransactionBufferData.getPropertyType()).to.be.equal(accountPropertiesAddressTransaction.propertyType);
		expect(AccountPropertiesAddressTransactionBufferData.getModifications()).to.eql(accountPropertiesAddressTransaction.modifications);
	});
});
