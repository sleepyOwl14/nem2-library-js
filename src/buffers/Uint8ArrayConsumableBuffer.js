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

export default Uint8ArrayConsumableBuffer;