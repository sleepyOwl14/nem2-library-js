import PropertyModificationBuffer from './PropertyModificationBuffer';
import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class AddressPropertyModificationBuffer {
    getModificationtype = () => {
        return this.modificationType
    }

    setModificationtype = (modificationType) => {
        this.modificationType = modificationType
    }

    getValue = () => {
        return this.value
    }

    setValue = (value) => {
        this.value = value
    }

    static loadFromBinary(consumableBuffer) {
        var object = new AddressPropertyModificationBuffer()
        var modificationType = consumableBuffer.get_bytes(1)
        object.modificationType = modificationType
        var value = consumableBuffer.get_bytes(25)
        object.value = value
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraymodificationType = fit_bytearray(this.modificationType, 1)
        newArray = concat_typedarrays(newArray, fitArraymodificationType)
        var fitArrayvalue = fit_bytearray(this.value, 25)
        newArray = concat_typedarrays(newArray, fitArrayvalue)
        return newArray
    }

}

class AddressPropertyTransactionBodyBuffer {
    getPropertytype = () => {
        return this.propertyType
    }

    setPropertytype = (propertyType) => {
        this.propertyType = propertyType
    }

    getModifications = () => {
        return this.modifications
    }

    setModifications = (modifications) => {
        this.modifications = modifications
    }

    static loadFromBinary(consumableBuffer) {
        var object = new AddressPropertyTransactionBodyBuffer()
        var propertyType = consumableBuffer.get_bytes(1)
        object.propertyType = propertyType
        var modificationsCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        object.modifications = []
        var i
        for (i = 0; i < modificationsCount; i++) {
            var newmodifications = AddressPropertyModificationBuffer.loadFromBinary(consumableBuffer)
            object.modifications.push(newmodifications)
        }
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraypropertyType = fit_bytearray(this.propertyType, 1)
        newArray = concat_typedarrays(newArray, fitArraypropertyType)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.modifications.length, 1))
        var i
        for (i in this.modifications) {
            newArray = concat_typedarrays(newArray, this.modifications[i].serialize())
        }
        return newArray
    }

}

class AddressPropertyTransactionBuffer {
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

    getPropertytype = () => {
        return this.propertyType
    }

    setPropertytype = (propertyType) => {
        this.propertyType = propertyType
    }

    getModifications = () => {
        return this.modifications
    }

    setModifications = (modifications) => {
        this.modifications = modifications
    }

    static loadFromBinary(consumableBuffer) {
        var object = new AddressPropertyTransactionBuffer()
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
        var propertyType = consumableBuffer.get_bytes(1)
        object.propertyType = propertyType
        var modificationsCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        object.modifications = []
        var i
        for (i = 0; i < modificationsCount; i++) {
            var newmodifications = AddressPropertyModificationBuffer.loadFromBinary(consumableBuffer)
            object.modifications.push(newmodifications)
        }
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
        var fitArraypropertyType = fit_bytearray(this.propertyType, 1)
        newArray = concat_typedarrays(newArray, fitArraypropertyType)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.modifications.length, 1))
        var i
        for (i in this.modifications) {
            newArray = concat_typedarrays(newArray, this.modifications[i].serialize())
        }
        return newArray
    }

}

class EmbeddedAddressPropertyTransactionBuffer {
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

    getPropertytype = () => {
        return this.propertyType
    }

    setPropertytype = (propertyType) => {
        this.propertyType = propertyType
    }

    getModifications = () => {
        return this.modifications
    }

    setModifications = (modifications) => {
        this.modifications = modifications
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedAddressPropertyTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var propertyType = consumableBuffer.get_bytes(1)
        object.propertyType = propertyType
        var modificationsCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        object.modifications = []
        var i
        for (i = 0; i < modificationsCount; i++) {
            var newmodifications = AddressPropertyModificationBuffer.loadFromBinary(consumableBuffer)
            object.modifications.push(newmodifications)
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
        var fitArraypropertyType = fit_bytearray(this.propertyType, 1)
        newArray = concat_typedarrays(newArray, fitArraypropertyType)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.modifications.length, 1))
        var i
        for (i in this.modifications) {
            newArray = concat_typedarrays(newArray, this.modifications[i].serialize())
        }
        return newArray
    }

}

module.exports = {
    PropertyModificationBuffer,
    AddressPropertyModificationBuffer,
    body : AddressPropertyTransactionBodyBuffer,
    default : AddressPropertyTransactionBuffer,
    embedded : EmbeddedAddressPropertyTransactionBuffer,
};

