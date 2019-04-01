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

import convert from '../coders/convert';
import {bufferUtils} from '../buffers';

class CommonEmbeddedBufferProperties{

    constructor(transactionBuffer){
        this.bufferClass = transactionBuffer;
    }

    getSize(){
        return bufferUtils.buffer_to_uint(this.bufferClass.getSize());
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
}

export default CommonEmbeddedBufferProperties;