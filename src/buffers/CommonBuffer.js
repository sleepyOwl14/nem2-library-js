import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

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

module.exports = {
    MosaicBuffer,
    SizePrefixedEntityBuffer,
    VerifiableEntityBuffer,
    EntityBodyBuffer,
}