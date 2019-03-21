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

export default AddressPropertyModificationBuffer;