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

class MosaicPropertyBuffer {
    getId = () => {
        return this.id
    }

    setId = (id) => {
        this.id = id
    }

    getValue = () => {
        return this.value
    }

    setValue = (value) => {
        this.value = value
    }

    static loadFromBinary(consumableBuffer) {
        var object = new MosaicPropertyBuffer()
        var id = consumableBuffer.get_bytes(1)
        object.id = id
        var value = consumableBuffer.get_bytes(8)
        object.value = value
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArrayid = fit_bytearray(this.id, 1)
        newArray = concat_typedarrays(newArray, fitArrayid)
        var fitArrayvalue = fit_bytearray(this.value, 8)
        newArray = concat_typedarrays(newArray, fitArrayvalue)
        return newArray
    }

}

class MosaicDefinitionTransactionBodyBuffer {
    getMosaicnonce = () => {
        return this.mosaicNonce
    }

    setMosaicnonce = (mosaicNonce) => {
        this.mosaicNonce = mosaicNonce
    }

    getMosaicid = () => {
        return this.mosaicId
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId
    }

    getFlags = () => {
        return this.flags
    }

    setFlags = (flags) => {
        this.flags = flags
    }

    getDivisibility = () => {
        return this.divisibility
    }

    setDivisibility = (divisibility) => {
        this.divisibility = divisibility
    }

    getProperties = () => {
        return this.properties
    }

    setProperties = (properties) => {
        this.properties = properties
    }

    static loadFromBinary(consumableBuffer) {
        var object = new MosaicDefinitionTransactionBodyBuffer()
        var mosaicNonce = consumableBuffer.get_bytes(4)
        object.mosaicNonce = mosaicNonce
        var mosaicId = consumableBuffer.get_bytes(8)
        object.mosaicId = mosaicId
        var propertiesCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        var flags = consumableBuffer.get_bytes(1)
        object.flags = flags
        var divisibility = consumableBuffer.get_bytes(1)
        object.divisibility = divisibility
        object.properties = []
        var i
        for (i = 0; i < propertiesCount; i++) {
            var newproperties = MosaicPropertyBuffer.loadFromBinary(consumableBuffer)
            object.properties.push(newproperties)
        }
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraymosaicNonce = fit_bytearray(this.mosaicNonce, 4)
        newArray = concat_typedarrays(newArray, fitArraymosaicNonce)
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8)
        newArray = concat_typedarrays(newArray, fitArraymosaicId)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.properties.length, 1))
        var fitArrayflags = fit_bytearray(this.flags, 1)
        newArray = concat_typedarrays(newArray, fitArrayflags)
        var fitArraydivisibility = fit_bytearray(this.divisibility, 1)
        newArray = concat_typedarrays(newArray, fitArraydivisibility)
        var i
        for (i in this.properties) {
            newArray = concat_typedarrays(newArray, this.properties[i].serialize())
        }
        return newArray
    }

}

class MosaicDefinitionTransactionBuffer {
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

    getMosaicnonce = () => {
        return this.mosaicNonce
    }

    setMosaicnonce = (mosaicNonce) => {
        this.mosaicNonce = mosaicNonce
    }

    getMosaicid = () => {
        return this.mosaicId
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId
    }

    getFlags = () => {
        return this.flags
    }

    setFlags = (flags) => {
        this.flags = flags
    }

    getDivisibility = () => {
        return this.divisibility
    }

    setDivisibility = (divisibility) => {
        this.divisibility = divisibility
    }

    getProperties = () => {
        return this.properties
    }

    setProperties = (properties) => {
        this.properties = properties
    }

    static loadFromBinary(consumableBuffer) {
        var object = new MosaicDefinitionTransactionBuffer()
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
        var mosaicNonce = consumableBuffer.get_bytes(4)
        object.mosaicNonce = mosaicNonce
        var mosaicId = consumableBuffer.get_bytes(8)
        object.mosaicId = mosaicId
        var propertiesCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        var flags = consumableBuffer.get_bytes(1)
        object.flags = flags
        var divisibility = consumableBuffer.get_bytes(1)
        object.divisibility = divisibility
        object.properties = []
        var i
        for (i = 0; i < propertiesCount; i++) {
            var newproperties = MosaicPropertyBuffer.loadFromBinary(consumableBuffer)
            object.properties.push(newproperties)
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
        var fitArraymosaicNonce = fit_bytearray(this.mosaicNonce, 4)
        newArray = concat_typedarrays(newArray, fitArraymosaicNonce)
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8)
        newArray = concat_typedarrays(newArray, fitArraymosaicId)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.properties.length, 1))
        var fitArrayflags = fit_bytearray(this.flags, 1)
        newArray = concat_typedarrays(newArray, fitArrayflags)
        var fitArraydivisibility = fit_bytearray(this.divisibility, 1)
        newArray = concat_typedarrays(newArray, fitArraydivisibility)
        var i
        for (i in this.properties) {
            newArray = concat_typedarrays(newArray, this.properties[i].serialize())
        }
        return newArray
    }

}

class EmbeddedMosaicDefinitionTransactionBuffer {
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

    getMosaicnonce = () => {
        return this.mosaicNonce
    }

    setMosaicnonce = (mosaicNonce) => {
        this.mosaicNonce = mosaicNonce
    }

    getMosaicid = () => {
        return this.mosaicId
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId
    }

    getFlags = () => {
        return this.flags
    }

    setFlags = (flags) => {
        this.flags = flags
    }

    getDivisibility = () => {
        return this.divisibility
    }

    setDivisibility = (divisibility) => {
        this.divisibility = divisibility
    }

    getProperties = () => {
        return this.properties
    }

    setProperties = (properties) => {
        this.properties = properties
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedMosaicDefinitionTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var mosaicNonce = consumableBuffer.get_bytes(4)
        object.mosaicNonce = mosaicNonce
        var mosaicId = consumableBuffer.get_bytes(8)
        object.mosaicId = mosaicId
        var propertiesCount = buffer_to_uint(consumableBuffer.get_bytes(1))
        var flags = consumableBuffer.get_bytes(1)
        object.flags = flags
        var divisibility = consumableBuffer.get_bytes(1)
        object.divisibility = divisibility
        object.properties = []
        var i
        for (i = 0; i < propertiesCount; i++) {
            var newproperties = MosaicPropertyBuffer.loadFromBinary(consumableBuffer)
            object.properties.push(newproperties)
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
        var fitArraymosaicNonce = fit_bytearray(this.mosaicNonce, 4)
        newArray = concat_typedarrays(newArray, fitArraymosaicNonce)
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8)
        newArray = concat_typedarrays(newArray, fitArraymosaicId)
        newArray = concat_typedarrays(newArray, uint_to_buffer(this.properties.length, 1))
        var fitArrayflags = fit_bytearray(this.flags, 1)
        newArray = concat_typedarrays(newArray, fitArrayflags)
        var fitArraydivisibility = fit_bytearray(this.divisibility, 1)
        newArray = concat_typedarrays(newArray, fitArraydivisibility)
        var i
        for (i in this.properties) {
            newArray = concat_typedarrays(newArray, this.properties[i].serialize())
        }
        return newArray
    }

}

module.exports = {
    MosaicPropertyBuffer,
    body : MosaicDefinitionTransactionBodyBuffer,
    default : MosaicDefinitionTransactionBuffer,
    embedded : EmbeddedMosaicDefinitionTransactionBuffer,
};

