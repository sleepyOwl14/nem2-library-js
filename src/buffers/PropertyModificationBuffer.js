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

class PropertyModificationBuffer {
    getModificationtype = () => {
        return this.modificationType
    }

    setModificationtype = (modificationType) => {
        this.modificationType = modificationType
    }

    static loadFromBinary(consumableBuffer) {
        var object = new PropertyModificationBuffer()
        var modificationType = consumableBuffer.get_bytes(1)
        object.modificationType = modificationType
        return object
    }

    serialize = () => {
        var newArray = new Uint8Array()
        var fitArraymodificationType = fit_bytearray(this.modificationType, 1)
        newArray = concat_typedarrays(newArray, fitArraymodificationType)
        return newArray
    }

}

export default PropertyModificationBuffer;