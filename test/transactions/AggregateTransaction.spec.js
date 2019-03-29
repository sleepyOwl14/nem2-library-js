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
import AggregateTransaction from '../../src/transactions/AggregateTransaction';
import TransferTransaction from '../../src/transactions/TransferTransaction';
import deadline from '../../src/transactions/Deadline';

describe('AggregateTransaction', () => {
	const keyPair = {
		publicKey: '846B4439154579A5903B1459C9CF69CB8153F6D0110A7A0ED61DE29AE4810BF2',
		privateKey: '239CCE2C5D2B83A70DC91AFEF0CE325FC9947FAA87C8B18473092CE6A745945A'
	};

	let transfer;


	before(() => {
		transfer = new TransferTransaction.Builder()
			.addDeadline(deadline())
			.addRecipient('SBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC')
			.addMessage({
				type: 0,
				payload: '00'
			})
			.addMosaics([{
				id: [3646934825, 3576016193],
				amount: [10000000, 0]
			}])
			.build()
			.toAggregateTransaction(keyPair.publicKey);
	});

	it('should create aggregate transfer transactions', () => {
		const aggregateTransaction = {
			deadline: deadline(),
			transactions: [
				transfer,
				transfer,
				transfer
			]
		};
		const verifiableTransaction = new AggregateTransaction.Builder()
			.addDeadline(aggregateTransaction.deadline)
			.addTransactions(aggregateTransaction.transactions)
			.build();

		const transactionPayload = verifiableTransaction.signTransaction(keyPair);

		expect(transactionPayload.payload.substring(240, transactionPayload.payload.length))
			.to.be.equal('05010000'+'57000000846B4439154579A5903B1459C9CF69CB8153F6D0110A7A0ED61DE29AE4810B' +
			'F2039054419050B9837EFAB4BBE8A4B9BB32D812F9885C00D8FC1650E142030001003030'+'29CF5FD941AD25D5'+'809' +
			'698000000000057000000846B4439154579A5903B1459C9CF69CB8153F6D0110A7A0ED61DE29AE4810BF2039054' +
			'419050B9837EFAB4BBE8A4B9BB32D812F9885C00D8FC1650E142030001003030'+'29CF5FD941AD25D5'+'80969800000' +
			'0000057000000846B4439154579A5903B1459C9CF69CB8153F6D0110A7A0ED61DE29AE4810BF2039054419050B9' +
			'837EFAB4BBE8A4B9BB32D812F9885C00D8FC1650E142030001003030'+'29CF5FD941AD25D5'+'8096980000000000');

		const AggregateTransactionBufferData = AggregateTransaction.loadFromPayload(transactionPayload.payload);

		expect(AggregateTransactionBufferData.getDeadline()).to.eql(aggregateTransaction.deadline);
		expect(AggregateTransactionBufferData.getTransactions()[0].getMessage()).to.eql({
			type: 0,
			payload: '00'
		});
		expect(AggregateTransactionBufferData.getTransactions()[0].getMosaics()).to.eql([{
			id: [3646934825, 3576016193],
			amount: [10000000, 0]
		}]);
		expect(AggregateTransactionBufferData.getTransactions()[0].getRecipient()).to.eql('SBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC');
	});
});
