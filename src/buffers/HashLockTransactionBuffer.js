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

import UnresolvedMosaicBuffer from './UnresolvedMosaicBuffer';

import BufferUtils from './BufferUtils';

const concat_typedarrays = BufferUtils.concat_typedarrays;
const fit_bytearray = BufferUtils.fit_bytearray;
const buffer_to_uint = BufferUtils.buffer_to_uint;
const uint_to_buffer = BufferUtils.uint_to_buffer;

class HashLockTransactionBodyBuffer {
    getMosaic = () => {
        return this.mosaic
    }

    setMosaic = (mosaic) => {
        this.mosaic = mosaic
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getHash = () => {
        return this.hash
    }

    setHash = (hash) => {
        this.hash = hash
    }

    static loadFromBinary(consumableBuffer) {
        var object = new HashLockTransactionBodyBuffer()
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hash = consumableBuffer.get_bytes(32)
        object.hash = hash
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhash = fit_bytearray(this.hash, 32)
        newArray = concat_typedarrays(newArray, fitArrayhash)
        return newArray
    }

}

class HashLockTransactionBuffer {
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

    getMosaic = () => {
        return this.mosaic
    }

    setMosaic = (mosaic) => {
        this.mosaic = mosaic
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getHash = () => {
        return this.hash
    }

    setHash = (hash) => {
        this.hash = hash
    }

    calculateSize = () => {
        var size = 176
        this.size = uint_to_buffer(size, 4)
    }

    static loadFromBinary(consumableBuffer) {
        var object = new HashLockTransactionBuffer()
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
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hash = consumableBuffer.get_bytes(32)
        object.hash = hash
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        this.calculateSize()
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
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhash = fit_bytearray(this.hash, 32)
        newArray = concat_typedarrays(newArray, fitArrayhash)
        return newArray
    }

}

class EmbeddedHashLockTransactionBuffer {
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

    getMosaic = () => {
        return this.mosaic
    }

    setMosaic = (mosaic) => {
        this.mosaic = mosaic
    }

    getDuration = () => {
        return this.duration
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    getHash = () => {
        return this.hash
    }

    setHash = (hash) => {
        this.hash = hash
    }

    calculateSize = () => {
        var size = 96
        this.size = uint_to_buffer(size, 4)
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedHashLockTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var mosaic = UnresolvedMosaicBuffer.loadFromBinary(consumableBuffer)
        object.mosaic = mosaic
        var duration = consumableBuffer.get_bytes(8)
        object.duration = duration
        var hash = consumableBuffer.get_bytes(32)
        object.hash = hash
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        this.calculateSize()
        var fitArraysize = fit_bytearray(this.size, 4)
        newArray = concat_typedarrays(newArray, fitArraysize)
        var fitArraysigner = fit_bytearray(this.signer, 32)
        newArray = concat_typedarrays(newArray, fitArraysigner)
        var fitArrayversion = fit_bytearray(this.version, 2)
        newArray = concat_typedarrays(newArray, fitArrayversion)
        var fitArraytype = fit_bytearray(this.type, 2)
        newArray = concat_typedarrays(newArray, fitArraytype)
        newArray = concat_typedarrays(newArray, this.mosaic.serialize())
        var fitArrayduration = fit_bytearray(this.duration, 8)
        newArray = concat_typedarrays(newArray, fitArrayduration)
        var fitArrayhash = fit_bytearray(this.hash, 32)
        newArray = concat_typedarrays(newArray, fitArrayhash)
        return newArray
    }

}

module.exports = {
    body : HashLockTransactionBodyBuffer,
    main : HashLockTransactionBuffer,
    embedded : EmbeddedHashLockTransactionBuffer,
};