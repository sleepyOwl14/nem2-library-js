/*
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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