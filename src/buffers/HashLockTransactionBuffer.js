import UnresolvedMosaicBuffer from './UnresolvedMosaicBuffer';

import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class HashLockTransactionBodyBuffer {
    getMosaic = () => {
        return this.mosaic
    }

    setMosaic = (mosaic) => {
        this.mosaic = mosaic
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getHash = () => {
        return this.hash
    }

    setHash = (hash) => {
        this.hash = hash
    }

    static loadFromBinary(consumableBuffer) {
        var object = new HashLockTransactionBodyBuffer()
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hash = consumableBuffer.get_bytes(32)
        object.hash = hash
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhash = fit_bytearray(this.hash, 32)
        newArray = concat_typedarrays(newArray, fitArrayhash)
        return newArray
    }

}

class HashLockTransactionBuffer {
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

    getMosaic = () => {
        return this.mosaic
    }

    setMosaic = (mosaic) => {
        this.mosaic = mosaic
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getHash = () => {
        return this.hash
    }

    setHash = (hash) => {
        this.hash = hash
    }

    static loadFromBinary(consumableBuffer) {
        var object = new HashLockTransactionBuffer()
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
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hash = consumableBuffer.get_bytes(32)
        object.hash = hash
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraysize = fit_bytearray(this.size, 4)
        newArray = concat_typedarrays(newArray, fitArraysize)
        var fitArraysignature = fit_bytearray(this.signature, 64)
        newArray = concat_typedarrays(newArray, fitArraysignature)
        var fitArraysigner = fit_bytearray(this.signer, 32)
        newArray = concat_typedarrays(newArray, fitArraysigner)
        var fitArrayversion = fit_bytearray(this.version, 2)
        newArray = concat_typedarrays(newArray, fitArrayversion)
        var fitArraytype = fit_bytearray(this.type, 2)
        newArray = concat_typedarrays(newArray, fitArraytype)
        var fitArrayfee = fit_bytearray(this.fee, 8)
        newArray = concat_typedarrays(newArray, fitArrayfee)
        var fitArraydeadline = fit_bytearray(this.deadline, 8)
        newArray = concat_typedarrays(newArray, fitArraydeadline)
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhash = fit_bytearray(this.hash, 32)
        newArray = concat_typedarrays(newArray, fitArrayhash)
        return newArray
    }

}

class EmbeddedHashLockTransactionBuffer {
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

    getMosaic = () => {
        return this.mosaic
    }

    setMosaic = (mosaic) => {
        this.mosaic = mosaic
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getHash = () => {
        return this.hash
    }

    setHash = (hash) => {
        this.hash = hash
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedHashLockTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hash = consumableBuffer.get_bytes(32)
        object.hash = hash
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
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhash = fit_bytearray(this.hash, 32)
        newArray = concat_typedarrays(newArray, fitArrayhash)
        return newArray
    }

}

module.exports = {
    body : HashLockTransactionBodyBuffer,
    default : HashLockTransactionBuffer,
    embedded : EmbeddedHashLockTransactionBuffer,
};