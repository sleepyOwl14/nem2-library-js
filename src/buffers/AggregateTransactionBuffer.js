import {TransactionBuffer, EmbeddedTransactionBuffer} from './TransactionBuffer';
import Uint8ArrayConsumableBuffer from './Uint8ArrayConsumableBuffer';
import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class AggregateTransactionBuffer extends TransactionBuffer{

    constructor(){
        super();
    }

    getTransactionsSize = () =>{
        return this.transactionsSize;
    }

    setTransactionsSize = (transactionsSize) =>{
        this.transactionsSize = transactionsSize;
    }

    getTransactions = () =>{
        return this.transactions;
    }

    setTransactions = (transactions) =>{
        this.transactions = transactions;
    }

    static loadFromBinary(consumableBuffer) {

        var object = new AggregateTransactionBuffer();

        var transactionBuffer = TransactionBuffer.loadFromBinary(consumableBuffer);

        object.size = transactionBuffer.getSize();
        object.signature = transactionBuffer.getSignature();
        object.signer = transactionBuffer.getSigner();
        object.version = transactionBuffer.getVersion();
        object.type = transactionBuffer.getType();
        object.fee = transactionBuffer.getFee();
        object.deadline = transactionBuffer.getDeadline();
        object.transactionsSize = buffer_to_uint(consumableBuffer.get_bytes(4))
        object.transactions = [];

        var transactionsConsumableBuffer = new Uint8ArrayConsumableBuffer(consumableBuffer.binary);

        console.log("Buffer length :" + consumableBuffer.binary.length);
        console.log("Buffer offset :" + consumableBuffer.offset);


        while((consumableBuffer.offset) < consumableBuffer.binary.length){
            
            console.log("Buffer offset :" + consumableBuffer.offset);

            var startOffset = consumableBuffer.offset;
            var embeddedTransactionBuffer = EmbeddedTransactionBuffer.loadFromBinary(consumableBuffer);
            var endOffset = consumableBuffer.offset;

            console.log("startOffset : "+ startOffset);
            console.log("endOffset : "+ endOffset);

            var transactionSize = buffer_to_uint(embeddedTransactionBuffer.size);
            console.log(embeddedTransactionBuffer.type);
            // remove remaining bytes
            consumableBuffer.get_bytes( transactionSize - (endOffset - startOffset) );

            var transaction = {
                bytes : transactionsConsumableBuffer.get_bytes(transactionSize), 
                type : buffer_to_uint(embeddedTransactionBuffer.type) 
            };

            object.transactions.push(transaction)
        }
        return object;
    }

    serialize = () => {
        var transactionBuffer = new TransactionBuffer();
        var transactionBytes = transactionBuffer.serialize();
        
        var newArray = Uint8Array.from(transactionBytes);
        
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.transactions.length, 4));

        newArray = concat_typedarrays(newArray, this.transactions);
        return newArray;
    }
}

module.exports = {
    AggregateTransactionBuffer,
    TransactionBuffer,
}