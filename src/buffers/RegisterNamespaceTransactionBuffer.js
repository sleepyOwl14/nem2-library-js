import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

var NamespaceType = Object.freeze({"root":0, "child":1})
var NamespaceTypeSize = Object.freeze({"duration": 8, "parentid": 8})

var returnBytes_by_namespaceType = (namespaceType, duration, parentid) => {

    var object = {};

    switch(buffer_to_uint(namespaceType)){
        case NamespaceType.root:
            object.binary = duration;
            object.byteSize = NamespaceTypeSize.duration;
            break;
        case NamespaceType.child:
            object.binary = parentid;
            object.byteSize = NamespaceTypeSize.parentid;
            break;
        default:
            object.binary = Uint8Array.of([0]);
            object.byteSize = 0;
            break;
    }

    return object;
}

var getBytes_by_namespaceType = (namespaceType, consumableBuffer) => {

    switch(buffer_to_uint(namespaceType)){
        case NamespaceType.root:
            return consumableBuffer.get_bytes(NamespaceTypeSize.duration);
            break;
        case NamespaceType.child:
            return consumableBuffer.get_bytes(NamespaceTypeSize.parentid);
            break;
        default:
            return null;
            break;
    }
}

class RegisterNamespaceTransactionBodyBuffer {
    getNamespacetype = () => {
        return this.namespaceType
    }

    setNamespacetype = (namespaceType) => {
        this.namespaceType = namespaceType
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getParentid = () => {
        return this.parentId
    }

    setParentid = (parentId) => {
        this.parentId = parentId
    }

    getNamespaceid = () => {
        return this.namespaceId
    }

    setNamespaceid = (namespaceId) => {
        this.namespaceId = namespaceId
    }

    getName = () => {
        return this.name
    }

    setName = (name) => {
        this.name = name
    }

    static loadFromBinary(consumableBuffer) {
        var object = new RegisterNamespaceTransactionBodyBuffer()
        var namespaceType = consumableBuffer.get_bytes(1)
        object.namespaceType = namespaceType
        var dynamicField = getBytes_by_namespaceType(namespaceType, consumableBuffer)
        switch(buffer_to_uint(namespaceType)){
            case NamespaceType.root:
                object.duration = dynamicField;
                break;
            case NamespaceType.child:
                object.parentId = dynamicField;
                break;
        }
        var namespaceId = consumableBuffer.get_bytes(8)
        object.namespaceId = namespaceId
        var namespaceNameSize = buffer_to_uint(consumableBuffer.get_bytes(1))
        var name = consumableBuffer.get_bytes(namespaceNameSize)
        object.name = name
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraynamespaceType = fit_bytearray(this.namespaceType, 1)
        newArray = concat_typedarrays(newArray, fitArraynamespaceType)
        var dynamicField = returnBytes_by_namespaceType(this.namespaceType, this.duration, this.parentId );
        var fitArrayDynamicField = fit_bytearray(dynamicField.binary, dynamicField.byteSize)
        newArray = concat_typedarrays(newArray, fitArrayDynamicField)
        var fitArraynamespaceId = fit_bytearray(this.namespaceId, 8)
        newArray = concat_typedarrays(newArray, fitArraynamespaceId)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.name.length, 1))
        newArray = concat_typedarrays(newArray, this.name)
        return newArray
    }

}

class RegisterNamespaceTransactionBuffer {
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

    getNamespacetype = () => {
        return this.namespaceType
    }

    setNamespacetype = (namespaceType) => {
        this.namespaceType = namespaceType
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getParentid = () => {
        return this.parentId
    }

    setParentid = (parentId) => {
        this.parentId = parentId
    }

    getNamespaceid = () => {
        return this.namespaceId
    }

    setNamespaceid = (namespaceId) => {
        this.namespaceId = namespaceId
    }

    getName = () => {
        return this.name
    }

    setName = (name) => {
        this.name = name
    }

    static loadFromBinary(consumableBuffer) {
        var object = new RegisterNamespaceTransactionBuffer()
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
        var namespaceType = consumableBuffer.get_bytes(1)
        object.namespaceType = namespaceType
        var dynamicField = getBytes_by_namespaceType(namespaceType, consumableBuffer)
        switch(buffer_to_uint(namespaceType)){
            case NamespaceType.root:
                object.duration = dynamicField;
                break;
            case NamespaceType.child:
                object.parentId = dynamicField;
                break;
        }
        var namespaceId = consumableBuffer.get_bytes(8)
        object.namespaceId = namespaceId
        var namespaceNameSize = buffer_to_uint(consumableBuffer.get_bytes(1))
        var name = consumableBuffer.get_bytes(namespaceNameSize)
        object.name = name
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
        var fitArraynamespaceType = fit_bytearray(this.namespaceType, 1)
        newArray = concat_typedarrays(newArray, fitArraynamespaceType)
        var dynamicField = returnBytes_by_namespaceType(this.namespaceType, this.duration, this.parentId );
        var fitArrayDynamicField = fit_bytearray(dynamicField.binary, dynamicField.byteSize)
        newArray = concat_typedarrays(newArray, fitArrayDynamicField)
        var fitArraynamespaceId = fit_bytearray(this.namespaceId, 8)
        newArray = concat_typedarrays(newArray, fitArraynamespaceId)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.name.length, 1))
        newArray = concat_typedarrays(newArray, this.name)
        return newArray
    }

}

class EmbeddedRegisterNamespaceTransactionBuffer {
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

    getNamespacetype = () => {
        return this.namespaceType
    }

    setNamespacetype = (namespaceType) => {
        this.namespaceType = namespaceType
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getParentid = () => {
        return this.parentId
    }

    setParentid = (parentId) => {
        this.parentId = parentId
    }

    getNamespaceid = () => {
        return this.namespaceId
    }

    setNamespaceid = (namespaceId) => {
        this.namespaceId = namespaceId
    }

    getName = () => {
        return this.name
    }

    setName = (name) => {
        this.name = name
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedRegisterNamespaceTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var namespaceType = consumableBuffer.get_bytes(1)
        object.namespaceType = namespaceType
        var dynamicField = getBytes_by_namespaceType(namespaceType, consumableBuffer)
        switch(buffer_to_uint(namespaceType)){
            case NamespaceType.root:
                object.duration = dynamicField;
                break;
            case NamespaceType.child:
                object.parentId = dynamicField;
                break;
        }
        var namespaceId = consumableBuffer.get_bytes(8)
        object.namespaceId = namespaceId
        var namespaceNameSize = buffer_to_uint(consumableBuffer.get_bytes(1))
        var name = consumableBuffer.get_bytes(namespaceNameSize)
        object.name = name
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
        var fitArraynamespaceType = fit_bytearray(this.namespaceType, 1)
        newArray = concat_typedarrays(newArray, fitArraynamespaceType)
        var dynamicField = returnBytes_by_namespaceType(this.namespaceType, this.duration, this.parentId );
        var fitArrayDynamicField = fit_bytearray(dynamicField.binary, dynamicField.byteSize)
        newArray = concat_typedarrays(newArray, fitArrayDynamicField)
        var fitArraynamespaceId = fit_bytearray(this.namespaceId, 8)
        newArray = concat_typedarrays(newArray, fitArraynamespaceId)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.name.length, 1))
        newArray = concat_typedarrays(newArray, this.name)
        return newArray
    }

}

module.exports = {
    embedded : EmbeddedRegisterNamespaceTransactionBuffer,
    default : RegisterNamespaceTransactionBuffer,
    body : RegisterNamespaceTransactionBodyBuffer,
    NamespaceType
};
