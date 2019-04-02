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

class MosaicAliasTransactionBodyBuffer {
    getAliasaction = () => {
        return this.aliasAction
    }

    setAliasaction = (aliasAction) => {
        this.aliasAction = aliasAction
    }

    getNamespaceid = () => {
        return this.namespaceId
    }

    setNamespaceid = (namespaceId) => {
        this.namespaceId = namespaceId
    }

    getMosaicid = () => {
        return this.mosaicId
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId
    }

    static loadFromBinary(consumableBuffer) {
        var object = new MosaicAliasTransactionBodyBuffer()
        var aliasAction = consumableBuffer.get_bytes(1)
        object.aliasAction = aliasAction
        var namespaceId = consumableBuffer.get_bytes(8)
        object.namespaceId = namespaceId
        var mosaicId = consumableBuffer.get_bytes(8)
        object.mosaicId = mosaicId
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArrayaliasAction = fit_bytearray(this.aliasAction, 1)
        newArray = concat_typedarrays(newArray, fitArrayaliasAction)
        var fitArraynamespaceId = fit_bytearray(this.namespaceId, 8)
        newArray = concat_typedarrays(newArray, fitArraynamespaceId)
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8)
        newArray = concat_typedarrays(newArray, fitArraymosaicId)
        return newArray
    }

}

class MosaicAliasTransactionBuffer {
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

    getAliasaction = () => {
        return this.aliasAction
    }

    setAliasaction = (aliasAction) => {
        this.aliasAction = aliasAction
    }

    getNamespaceid = () => {
        return this.namespaceId
    }

    setNamespaceid = (namespaceId) => {
        this.namespaceId = namespaceId
    }

    getMosaicid = () => {
        return this.mosaicId
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId
    }

    static loadFromBinary(consumableBuffer) {
        var object = new MosaicAliasTransactionBuffer()
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
        var aliasAction = consumableBuffer.get_bytes(1)
        object.aliasAction = aliasAction
        var namespaceId = consumableBuffer.get_bytes(8)
        object.namespaceId = namespaceId
        var mosaicId = consumableBuffer.get_bytes(8)
        object.mosaicId = mosaicId
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
        var fitArrayaliasAction = fit_bytearray(this.aliasAction, 1)
        newArray = concat_typedarrays(newArray, fitArrayaliasAction)
        var fitArraynamespaceId = fit_bytearray(this.namespaceId, 8)
        newArray = concat_typedarrays(newArray, fitArraynamespaceId)
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8)
        newArray = concat_typedarrays(newArray, fitArraymosaicId)
        return newArray
    }

}

class EmbeddedMosaicAliasTransactionBuffer {
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

    getAliasaction = () => {
        return this.aliasAction
    }

    setAliasaction = (aliasAction) => {
        this.aliasAction = aliasAction
    }

    getNamespaceid = () => {
        return this.namespaceId
    }

    setNamespaceid = (namespaceId) => {
        this.namespaceId = namespaceId
    }

    getMosaicid = () => {
        return this.mosaicId
    }

    setMosaicid = (mosaicId) => {
        this.mosaicId = mosaicId
    }

    static loadFromBinary(consumableBuffer) {
        var object = new EmbeddedMosaicAliasTransactionBuffer()
        var size = consumableBuffer.get_bytes(4)
        object.size = size
        var signer = consumableBuffer.get_bytes(32)
        object.signer = signer
        var version = consumableBuffer.get_bytes(2)
        object.version = version
        var type = consumableBuffer.get_bytes(2)
        object.type = type
        var aliasAction = consumableBuffer.get_bytes(1)
        object.aliasAction = aliasAction
        var namespaceId = consumableBuffer.get_bytes(8)
        object.namespaceId = namespaceId
        var mosaicId = consumableBuffer.get_bytes(8)
        object.mosaicId = mosaicId
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
        var fitArrayaliasAction = fit_bytearray(this.aliasAction, 1)
        newArray = concat_typedarrays(newArray, fitArrayaliasAction)
        var fitArraynamespaceId = fit_bytearray(this.namespaceId, 8)
        newArray = concat_typedarrays(newArray, fitArraynamespaceId)
        var fitArraymosaicId = fit_bytearray(this.mosaicId, 8)
        newArray = concat_typedarrays(newArray, fitArraymosaicId)
        return newArray
    }

}

module.exports = {
    body : MosaicAliasTransactionBodyBuffer,
    main : MosaicAliasTransactionBuffer,
    embedded : EmbeddedMosaicAliasTransactionBuffer,
};

