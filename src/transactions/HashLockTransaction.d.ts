/*
 * Copyright 2018 NEM
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

import {VerifiableTransaction} from "./VerifiableTransaction";
import {CommonBufferProperties, CommonEmbeddedBufferProperties} from '../buffers';

export declare class HashLockTransaction extends VerifiableTransaction {
}

export declare module HashLockTransaction {

    loadFromBinary(binary) : BufferProperties;

    loadFromPayload(string): BufferProperties; 

    loadEmbeddedFromBinary(binary): BufferProperties; 

    loadEmbeddedFromPayload(string): BufferProperties;
    
    createBufferProperties(CommonBufferProperties | CommonEmbeddedBufferProperties) : BufferProperties;

    class BufferProperties{

        getMosaic(): Array;
    
        getDuration(): Array;
    
        getHash() : String;
    }

    class Builder {

        addFee(fee): Builder;

        addVersion(version): Builder;

        addType(type): Builder;

        addDeadline(deadline): Builder;

        addMosaicId(mosaicId): Builder;

        addMosaicAmount(mosaicAmount): Builder;

        addDuration(duration): Builder;

        addHash(hash): Builder;

        build(): HashLockTransaction;
    }
}