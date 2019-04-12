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

import BufferUtils from './BufferUtils';

const concat_typedarrays = BufferUtils.concat_typedarrays;
const fit_bytearray = BufferUtils.fit_bytearray;
const buffer_to_uint = BufferUtils.buffer_to_uint;
const uint_to_buffer = BufferUtils.uint_to_buffer;

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