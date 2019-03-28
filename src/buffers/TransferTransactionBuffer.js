import UnresolvedMosaicBuffer from './UnresolvedMosaicBuffer';
import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class TransferTransactionBodyBuffer {
    getRecipient = () => {
        return this.recipient;
    }

    setRecipient = (recipient) => {
        this.recipient = recipient;
    }

    getMessage = () => {
        return this.message
    }

    setMessage = (message) => {
        this.message = message
    }

    getMosaics = () => {
        return this.mosaics
    }

    setMosaics = (mosaics) => {
        this.mosaics = mosaics
    }

    static loadFromBinary(consumableBuffer) {
        var object = new TransferTransactionBodyBuffer()
        var recipient = consumableBuffer.get_bytes(25)
        object.recipient = recipient
        var messageSize = buffer_to_uint(consumableBuffer.get_bytes(2))
        var mosaicsCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        var message = consumableBuffer.get_bytes(messageSize)
        object.message = message
        object.mosaics = []
        var i
        for (i = 0; i < mosaicsCount; i++) {
            var newmosaics = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
            object.mosaics.push(newmosaics)
        }
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArrayrecipient = fit_bytearray(this.recipient, 25)
        newArray = concat_typedarrays(newArray, fitArrayrecipient)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.message.length, 2))
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.mosaics.length, 1))
        newArray = concat_typedarrays(newArray, this.message)
        var i
        for (i in this.mosaics) {
            newArray = concat_typedarrays(newArray, this.mosaics[i].serialize())
        }
        return newArray
    }

}

class TransferTransactionBuffer {
    getSize = () => {
        return this.size
    }

    setSize = (size) => {
        this.size = size
    }

    getSignature = () => {
        return this.signature
    }

    setSignature = (signature) => {
        this.signature = signature
    }

    getSigner = () => {
        return this.signer
    }

    setSigner = (signer) => {
        this.signer = signer
    }

    getVersion = () => {
        return this.version
    }

    setVersion = (version) => {
        this.version = version
    }

    getType = () => {
        return this.type
    }

    setType = (type) => {
        this.type = type
    }

    getFee = () => {
        return this.fee
    }

    setFee = (fee) => {
        this.fee = fee
    }

    getDeadline = () => {
        return this.deadline
    }

    setDeadline = (deadline) => {
        this.deadline = deadline
    }

    getRecipient = () => {
        return this.recipient
    }

    setRecipient = (recipient) => {
        this.recipient = recipient
    }

    getMessage = () => {
        return this.message
    }

    setMessage = (message) => {
        this.message = message
    }

    getMosaics = () => {
        return this.mosaics
    }

    setMosaics = (mosaics) => {
        this.mosaics = mosaics
    }

    static loadFromBinary(consumableBuffer) {
        var object = new TransferTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signature = consumableBuffer.get_bytes(64)
        object.signature = signature
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var fee = consumableBuffer.get_bytes(8)
        object.fee = fee
        var deadline = consumableBuffer.get_bytes(8)
        object.deadline = deadline
        var recipient = consumableBuffer.get_bytes(25)
        object.recipient = recipient
        var messageSize = buffer_to_uint(consumableBuffer.get_bytes(2))
        var mosaicsCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        var message = consumableBuffer.get_bytes(messageSize)
        object.message = message
        object.mosaics = []
        var i
        for (i = 0; i < mosaicsCount; i++) {
            var newmosaics = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
            object.mosaics.push(newmosaics)
        }
        return object
    }

    serialize = () => {

        var newArray = new Uint8Array();
        var fitArraysize = fit_bytearray(this.size, 4);
        //console.log(fitArraysize);
        newArray = concat_typedarrays(newArray, fitArraysize);
        var fitArraysignature = fit_bytearray(this.signature, 64);
        newArray = concat_typedarrays(newArray, fitArraysignature);
        var fitArraysigner = fit_bytearray(this.signer, 32);
        newArray = concat_typedarrays(newArray, fitArraysigner);
        var fitArrayversion = fit_bytearray(this.version, 2);
        newArray = concat_typedarrays(newArray, fitArrayversion);
        var fitArraytype = fit_bytearray(this.type, 2);
        newArray = concat_typedarrays(newArray, fitArraytype);
        var fitArrayfee = fit_bytearray(this.fee, 8);
        newArray = concat_typedarrays(newArray, fitArrayfee);
        var fitArraydeadline = fit_bytearray(this.deadline, 8);
        newArray = concat_typedarrays(newArray, fitArraydeadline);
        var fitArrayrecipient = fit_bytearray(this.recipient, 25);
        newArray = concat_typedarrays(newArray, fitArrayrecipient);
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.message.length, 2));
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.mosaics.length, 1));

        newArray = concat_typedarrays(newArray, this.message)
        var i;
        for (i in this.mosaics) {
            //console.log(this.mosaics[i].serialize());
            newArray = concat_typedarrays(newArray, this.mosaics[i].serialize());
        }
        return newArray;
    }

}

class EmbeddedTransferTransactionBuffer {
    getSize = () => {
        return this.size
    }

    setSize = (size) => {
        this.size = size
    }

    getSigner = () => {
        return this.signer
    }

    setSigner = (signer) => {
        this.signer = signer
    }

    getVersion = () => {
        return this.version
    }

    setVersion = (version) => {
        this.version = version
    }

    getType = () => {
        return this.type
    }

    setType = (type) => {
        this.type = type
    }

    getRecipient = () => {
        return this.recipient
    }

    setRecipient = (recipient) => {
        this.recipient = recipient
    }

    getMessage = () => {
        return this.message
    }

    setMessage = (message) => {
        this.message = message
    }

    getMosaics = () => {
        return this.mosaics
    }

    setMosaics = (mosaics) => {
        this.mosaics = mosaics
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedTransferTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var recipient = consumableBuffer.get_bytes(25)
        object.recipient = recipient
        var messageSize = buffer_to_uint(consumableBuffer.get_bytes(2))
        var mosaicsCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        var message = consumableBuffer.get_bytes(messageSize)
        object.message = message
        object.mosaics = []
        var i
        for (i = 0; i < mosaicsCount; i++) {
            var newmosaics = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
            object.mosaics.push(newmosaics)
        }
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraysize = fit_bytearray(this.size, 4)
        newArray = concat_typedarrays(newArray, fitArraysize)
        var fitArraysigner = fit_bytearray(this.signer, 32)
        newArray = concat_typedarrays(newArray, fitArraysigner)
        var fitArrayversion = fit_bytearray(this.version, 2)
        newArray = concat_typedarrays(newArray, fitArrayversion)
        var fitArraytype = fit_bytearray(this.type, 2)
        newArray = concat_typedarrays(newArray, fitArraytype)
        var fitArrayrecipient = fit_bytearray(this.recipient, 25)
        newArray = concat_typedarrays(newArray, fitArrayrecipient)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.message.length, 2))
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.mosaics.length, 1))
        newArray = concat_typedarrays(newArray, this.message)
        var i
        for (i in this.mosaics) {
            newArray = concat_typedarrays(newArray, this.mosaics[i].serialize())
        }
        return newArray
    }

}

module.exports = {
    UnresolvedMosaicBuffer,
    body : TransferTransactionBodyBuffer,
    default : TransferTransactionBuffer,
    embedded: EmbeddedTransferTransactionBuffer,
};

