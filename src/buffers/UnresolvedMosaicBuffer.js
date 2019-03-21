import bufferUtils from './BufferUtils';

var concat_typedarrays = bufferUtils.concat_typedarrays;
var fit_bytearray = bufferUtils.fit_bytearray;
var buffer_to_uint = bufferUtils.buffer_to_uint;
var uint_to_buffer = bufferUtils.uint_to_buffer;

class UnresolvedMosaicBuffer{
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

export default UnresolvedMosaicBuffer;