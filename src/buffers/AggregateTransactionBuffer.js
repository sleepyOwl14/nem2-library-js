import TransactionBufferPackage from './TransactionBuffer';
import Uint8ArrayConsumableBuffer from './Uint8ArrayConsumableBuffer';
import bufferUtils from './BufferUtils';

const TransactionBuffer = TransactionBufferPackage.default;
const EmbeddedTransactionBuffer = TransactionBufferPackage.embedded;

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

    static loadAggregateFromBinary(consumableBuffer) {

        var object = new AggregateTransactionBuffer();

        var transactionBuffer = this.loadFromBinary(consumableBuffer);

        object.size = transactionBuffer.getSize();
        object.signature = transactionBuffer.getSignature();
        object.signer = transactionBuffer.getSigner();
        object.version = transactionBuffer.getVersion();
        object.type = transactionBuffer.getType();
        object.fee = transactionBuffer.getFee();
        object.deadline = transactionBuffer.getDeadline();
        object.transactionsSize = buffer_to_uint(consumableBuffer.get_bytes(4))
        object.transactions = [];

        var newArray = Array.from(consumableBuffer.binary);
        newArray.splice(0, consumableBuffer.offset);
        var transactionsConsumableBuffer = new Uint8ArrayConsumableBuffer(Uint8Array.from(newArray));

        while((consumableBuffer.offset) < consumableBuffer.binary.length){

            var startOffset = consumableBuffer.offset;
            var embeddedTransactionBuffer = EmbeddedTransactionBuffer.loadFromBinary(consumableBuffer);
            var endOffset = consumableBuffer.offset;

            var transactionSize = buffer_to_uint(embeddedTransactionBuffer.size);
           
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

    serializeAggregate = () => {
        var transactionBytes = this.serialize();

        var newArray = Uint8Array.from(transactionBytes);
        
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.transactions.length, 4));

        newArray = concat_typedarrays(newArray, this.transactions);
        return newArray;
    }
}

module.exports = {
    default : AggregateTransactionBuffer,
    TransactionBuffer,
}