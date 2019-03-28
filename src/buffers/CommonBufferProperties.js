import convert from '../coders/convert';
import {bufferUtils} from '../buffers';

class CommonBufferProperties{

    constructor(transactionBuffer){
        this.bufferClass = transactionBuffer;
    }

    getSize(){
        return bufferUtils.buffer_to_uint(this.bufferClass.getSize());
    }

    getSignature(){
        return convert.uint8ToHex(this.bufferClass.getSignature());
    }

    getSigner(){
        return convert.uint8ToHex(this.bufferClass.getSigner());
    }

    getVersion(){
        return bufferUtils.buffer_to_uint(this.bufferClass.getVersion());
    }

    getVersionHex(){
        return bufferUtils.buffer_to_uint(this.bufferClass.getVersion()).toString(16);
    }

    getType(){
        return bufferUtils.buffer_to_uint(this.bufferClass.getType());
    }

    getTypeHex(){
        return bufferUtils.buffer_to_uint(this.bufferClass.getType()).toString(16);
    }

    getFee(){
        return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getFee());
    }

    getDeadline(){
        return bufferUtils.bufferArray_to_uint32Array(this.bufferClass.getDeadline());
    }
}

export default CommonBufferProperties;