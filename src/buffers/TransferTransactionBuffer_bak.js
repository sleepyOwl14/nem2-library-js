

var concat_typedarrays = (array1, array2) => {
    var newArray = new Uint8Array(array1.length + array2.length);

    newArray.set(array1);

    newArray.set(array2, array1.length);

    return newArray;
}

var fit_bytearray = (array, size) => {
    if (array == null) {
        var newArray = new Uint8Array(size);
        newArray.fill(0);
        return newArray;
    }
    if (array.length > size) {
        throw new RangeError("Data size larger than allowed");
    }
    else if (array.length < size) {
        var newArray = new Uint8Array(size);
        newArray.fill(0);
        newArray.set(array, size - array.length);
        return newArray;
    }
    return array;
}

class Uint8ArrayConsumableBuffer {
    constructor(binary) {
        this.offset = 0;
        this.binary = binary;
    }

    get_bytes = (count) => {
        if (count + this.offset > this.binary.length)
            throw new RangeError();
        var bytes = this.binary.slice(this.offset, this.offset + count);
        this.offset += count;
        return bytes;
    }

}

var buffer_to_uint = (buffer) => {
    var dataView = new DataView(buffer.buffer)
    if (buffer.byteLength == 1)
        return dataView.getUint8(0, true);
    else if (buffer.byteLength == 2)
        return dataView.getUint16(0, true);
    else if (buffer.byteLength == 4)
        return dataView.getUint32(0, true);
}

var uint_to_buffer = (uint, bufferSize) => {
    var buffer = new ArrayBuffer(bufferSize);
    var dataView = new DataView(buffer);
    if (bufferSize == 1)
        dataView.setUint8(0, uint, true);
    else if (bufferSize == 2)
        dataView.setUint16(0, uint, true);
    else if (bufferSize == 4)
        dataView.setUint32(0, uint, true);
    return new Uint8Array(buffer);
}

class MosaicBuffer {
    getMosaicid = () => {
        return this.mosaicId;
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId;
    }

    getAmount = () => {
        return this.amount;
    }

    setAmount = (amount) => {
        this.amount = amount;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new MosaicBuffer();
        var mosaicId = consumableBuffer.get_bytes(8);
        object.mosaicId = mosaicId;
        var amount = consumableBuffer.get_bytes(8);
        object.amount = amount;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8);
        newArray = concat_typedarrays(newArray, fitArraymosaicId);
        var fitArrayamount = fit_bytearray(this.amount, 8);
        newArray = concat_typedarrays(newArray, fitArrayamount);
        return newArray;
    }

}

class UnresolvedMosaicBuffer {
    getMosaicid = () => {
        return this.mosaicId;
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId;
    }

    getAmount = () => {
        return this.amount;
    }

    setAmount = (amount) => {
        this.amount = amount;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new UnresolvedMosaicBuffer();
        var mosaicId = consumableBuffer.get_bytes(8);
        object.mosaicId = mosaicId;
        var amount = consumableBuffer.get_bytes(8);
        object.amount = amount;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8);
        newArray = concat_typedarrays(newArray, fitArraymosaicId);
        var fitArrayamount = fit_bytearray(this.amount, 8);
        newArray = concat_typedarrays(newArray, fitArrayamount);
        return newArray;
    }

}

class SizePrefixedEntityBuffer {
    getSize = () => {
        return this.size;
    }

    setSize = (size) => {
        this.size = size;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new SizePrefixedEntityBuffer();
        var size = consumableBuffer.get_bytes(4);
        object.size = size;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraysize = fit_bytearray(this.size, 4);
        newArray = concat_typedarrays(newArray, fitArraysize);
        return newArray;
    }

}

class VerifiableEntityBuffer {
    getSignature = () => {
        return this.signature;
    }

    setSignature = (signature) => {
        this.signature = signature;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new VerifiableEntityBuffer();
        var signature = consumableBuffer.get_bytes(64);
        object.signature = signature;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraysignature = fit_bytearray(this.signature, 64);
        newArray = concat_typedarrays(newArray, fitArraysignature);
        return newArray;
    }

}

class EntityBodyBuffer {
    getSigner = () => {
        return this.signer;
    }

    setSigner = (signer) => {
        this.signer = signer;
    }

    getVersion = () => {
        return this.version;
    }

    setVersion = (version) => {
        this.version = version;
    }

    getType = () => {
        return this.type;
    }

    setType = (type) => {
        this.type = type;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EntityBodyBuffer();
        var signer = consumableBuffer.get_bytes(32);
        object.signer = signer;
        var version = consumableBuffer.get_bytes(2);
        object.version = version;
        var type = consumableBuffer.get_bytes(2);
        object.type = type;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraysigner = fit_bytearray(this.signer, 32);
        newArray = concat_typedarrays(newArray, fitArraysigner);
        var fitArrayversion = fit_bytearray(this.version, 2);
        newArray = concat_typedarrays(newArray, fitArrayversion);
        var fitArraytype = fit_bytearray(this.type, 2);
        newArray = concat_typedarrays(newArray, fitArraytype);
        return newArray;
    }

}

class TransactionBuffer {
    getSize = () => {
        return this.size;
    }

    setSize = (size) => {
        this.size = size;
    }

    getSignature = () => {
        return this.signature;
    }

    setSignature = (signature) => {
        this.signature = signature;
    }

    getSigner = () => {
        return this.signer;
    }

    setSigner = (signer) => {
        this.signer = signer;
    }

    getVersion = () => {
        return this.version;
    }

    setVersion = (version) => {
        this.version = version;
    }

    getType = () => {
        return this.type;
    }

    setType = (type) => {
        this.type = type;
    }

    getFee = () => {
        return this.fee;
    }

    setFee = (fee) => {
        this.fee = fee;
    }

    getDeadline = () => {
        return this.deadline;
    }

    setDeadline = (deadline) => {
        this.deadline = deadline;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new TransactionBuffer();
        var size = consumableBuffer.get_bytes(4);
        object.size = size;
        var signature = consumableBuffer.get_bytes(64);
        object.signature = signature;
        var signer = consumableBuffer.get_bytes(32);
        object.signer = signer;
        var version = consumableBuffer.get_bytes(2);
        object.version = version;
        var type = consumableBuffer.get_bytes(2);
        object.type = type;
        var fee = consumableBuffer.get_bytes(8);
        object.fee = fee;
        var deadline = consumableBuffer.get_bytes(8);
        object.deadline = deadline;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraysize = fit_bytearray(this.size, 4);
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
        return newArray;
    }

}

class EmbeddedTransactionBuffer {
    getSize = () => {
        return this.size;
    }

    setSize = (size) => {
        this.size = size;
    }

    getSigner = () => {
        return this.signer;
    }

    setSigner = (signer) => {
        this.signer = signer;
    }

    getVersion = () => {
        return this.version;
    }

    setVersion = (version) => {
        this.version = version;
    }

    getType = () => {
        return this.type;
    }

    setType = (type) => {
        this.type = type;
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedTransactionBuffer();
        var size = consumableBuffer.get_bytes(4);
        object.size = size;
        var signer = consumableBuffer.get_bytes(32);
        object.signer = signer;
        var version = consumableBuffer.get_bytes(2);
        object.version = version;
        var type = consumableBuffer.get_bytes(2);
        object.type = type;
        return object;
    }

    serialize = () => {
        var newArray = new Uint8Array();
        var fitArraysize = fit_bytearray(this.size, 4);
        newArray = concat_typedarrays(newArray, fitArraysize);
        var fitArraysigner = fit_bytearray(this.signer, 32);
        newArray = concat_typedarrays(newArray, fitArraysigner);
        var fitArrayversion = fit_bytearray(this.version, 2);
        newArray = concat_typedarrays(newArray, fitArrayversion);
        var fitArraytype = fit_bytearray(this.type, 2);
        newArray = concat_typedarrays(newArray, fitArraytype);
        return newArray;
    }

}

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
    concat_typedarrays,
    fit_bytearray,
    Uint8ArrayConsumableBuffer,
    buffer_to_uint,
    uint_to_buffer,
    MosaicBuffer,
    UnresolvedMosaicBuffer,
    SizePrefixedEntityBuffer,
    VerifiableEntityBuffer,
    EntityBodyBuffer,
    TransactionBuffer,
    EmbeddedTransactionBuffer,
    TransferTransactionBodyBuffer,
    TransferTransactionBuffer,
    EmbeddedTransferTransactionBuffer,
};

