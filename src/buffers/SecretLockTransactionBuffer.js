import UnresolvedMosaicBuffer from './UnresolvedMosaicBuffer';
import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class SecretLockTransactionBodyBuffer {
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

    getHashalgorithm = () => {
        return this.hashAlgorithm
    }

    setHashalgorithm = (hashAlgorithm) => {
        this.hashAlgorithm = hashAlgorithm
    }

    getSecret = () => {
        return this.secret
    }

    setSecret = (secret) => {
        this.secret = secret
    }

    getRecipient = () => {
        return this.recipient
    }

    setRecipient = (recipient) => {
        this.recipient = recipient
    }

    static loadFromBinary(consumableBuffer) {
        var object = new SecretLockTransactionBodyBuffer()
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hashAlgorithm = consumableBuffer.get_bytes(1)
        object.hashAlgorithm = hashAlgorithm
        var secret = consumableBuffer.get_bytes(32)
        object.secret = secret
        var recipient = consumableBuffer.get_bytes(25)
        object.recipient = recipient
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhashAlgorithm = fit_bytearray(this.hashAlgorithm, 1)
        newArray = concat_typedarrays(newArray, fitArrayhashAlgorithm)
        var fitArraysecret = fit_bytearray(this.secret, 32)
        newArray = concat_typedarrays(newArray, fitArraysecret)
        var fitArrayrecipient = fit_bytearray(this.recipient, 25)
        newArray = concat_typedarrays(newArray, fitArrayrecipient)
        return newArray
    }

}

class SecretLockTransactionBuffer {
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

    getHashalgorithm = () => {
        return this.hashAlgorithm
    }

    setHashalgorithm = (hashAlgorithm) => {
        this.hashAlgorithm = hashAlgorithm
    }

    getSecret = () => {
        return this.secret
    }

    setSecret = (secret) => {
        this.secret = secret
    }

    getRecipient = () => {
        return this.recipient
    }

    setRecipient = (recipient) => {
        this.recipient = recipient
    }

    static loadFromBinary(consumableBuffer) {
        var object = new SecretLockTransactionBuffer()
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
        var hashAlgorithm = consumableBuffer.get_bytes(1)
        object.hashAlgorithm = hashAlgorithm
        var secret = consumableBuffer.get_bytes(32) 
        object.secret = secret
        var recipient = consumableBuffer.get_bytes(25)
        object.recipient = recipient
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
        var fitArrayhashAlgorithm = fit_bytearray(this.hashAlgorithm, 1)
        newArray = concat_typedarrays(newArray, fitArrayhashAlgorithm)
        var fitArraysecret = fit_bytearray(this.secret, 32)
        newArray = concat_typedarrays(newArray, fitArraysecret)
        var fitArrayrecipient = fit_bytearray(this.recipient, 25)
        newArray = concat_typedarrays(newArray, fitArrayrecipient)
        return newArray
    }

}

class EmbeddedSecretLockTransactionBuffer {
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

    getHashalgorithm = () => {
        return this.hashAlgorithm
    }

    setHashalgorithm = (hashAlgorithm) => {
        this.hashAlgorithm = hashAlgorithm
    }

    getSecret = () => {
        return this.secret
    }

    setSecret = (secret) => {
        this.secret = secret
    }

    getRecipient = () => {
        return this.recipient
    }

    setRecipient = (recipient) => {
        this.recipient = recipient
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedSecretLockTransactionBuffer()
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
        var hashAlgorithm = consumableBuffer.get_bytes(1)
        object.hashAlgorithm = hashAlgorithm
        var secret = consumableBuffer.get_bytes(32)
        object.secret = secret
        var recipient = consumableBuffer.get_bytes(25)
        object.recipient = recipient
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
        var fitArrayhashAlgorithm = fit_bytearray(this.hashAlgorithm, 1)
        newArray = concat_typedarrays(newArray, fitArrayhashAlgorithm)
        var fitArraysecret = fit_bytearray(this.secret, 32)
        newArray = concat_typedarrays(newArray, fitArraysecret)
        var fitArrayrecipient = fit_bytearray(this.recipient, 25)
        newArray = concat_typedarrays(newArray, fitArrayrecipient)
        return newArray
    }

}

module.exports = {
    body : SecretLockTransactionBodyBuffer,
    default : SecretLockTransactionBuffer,
    embedded : EmbeddedSecretLockTransactionBuffer,
};
