import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class AccountLinkTransactionBodyBuffer {
    getRemoteaccountkey = () => {
        return this.remoteAccountKey
    }

    setRemoteaccountkey = (remoteAccountKey) => {
        this.remoteAccountKey = remoteAccountKey
    }

    getLinkaction = () => {
        return this.linkAction
    }

    setLinkaction = (linkAction) => {
        this.linkAction = linkAction
    }

    static loadFromBinary(consumableBuffer) {
        var object = new AccountLinkTransactionBodyBuffer()
        var remoteAccountKey = consumableBuffer.get_bytes(32)
        object.remoteAccountKey = remoteAccountKey
        var linkAction = consumableBuffer.get_bytes(1)
        object.linkAction = linkAction
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArrayremoteAccountKey = fit_bytearray(this.remoteAccountKey, 32)
        newArray = concat_typedarrays(newArray, fitArrayremoteAccountKey)
        var fitArraylinkAction = fit_bytearray(this.linkAction, 1)
        newArray = concat_typedarrays(newArray, fitArraylinkAction)
        return newArray
    }

}

class AccountLinkTransactionBuffer {
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

    getRemoteaccountkey = () => {
        return this.remoteAccountKey
    }

    setRemoteaccountkey = (remoteAccountKey) => {
        this.remoteAccountKey = remoteAccountKey
    }

    getLinkaction = () => {
        return this.linkAction
    }

    setLinkaction = (linkAction) => {
        this.linkAction = linkAction
    }

    static loadFromBinary(consumableBuffer) {
        var object = new AccountLinkTransactionBuffer()
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
        var remoteAccountKey = consumableBuffer.get_bytes(32)
        object.remoteAccountKey = remoteAccountKey
        var linkAction = consumableBuffer.get_bytes(1)
        object.linkAction = linkAction
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
        var fitArrayremoteAccountKey = fit_bytearray(this.remoteAccountKey, 32)
        newArray = concat_typedarrays(newArray, fitArrayremoteAccountKey)
        var fitArraylinkAction = fit_bytearray(this.linkAction, 1)
        newArray = concat_typedarrays(newArray, fitArraylinkAction)
        return newArray
    }

}

class EmbeddedAccountLinkTransactionBuffer {
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

    getRemoteaccountkey = () => {
        return this.remoteAccountKey
    }

    setRemoteaccountkey = (remoteAccountKey) => {
        this.remoteAccountKey = remoteAccountKey
    }

    getLinkaction = () => {
        return this.linkAction
    }

    setLinkaction = (linkAction) => {
        this.linkAction = linkAction
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedAccountLinkTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var remoteAccountKey = consumableBuffer.get_bytes(32)
        object.remoteAccountKey = remoteAccountKey
        var linkAction = consumableBuffer.get_bytes(1)
        object.linkAction = linkAction
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
        var fitArrayremoteAccountKey = fit_bytearray(this.remoteAccountKey, 32)
        newArray = concat_typedarrays(newArray, fitArrayremoteAccountKey)
        var fitArraylinkAction = fit_bytearray(this.linkAction, 1)
        newArray = concat_typedarrays(newArray, fitArraylinkAction)
        return newArray
    }

}

module.exports = {
    body : AccountLinkTransactionBodyBuffer,
    default : AccountLinkTransactionBuffer,
    embedded : EmbeddedAccountLinkTransactionBuffer,
};

