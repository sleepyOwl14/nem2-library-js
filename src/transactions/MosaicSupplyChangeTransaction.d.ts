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
import BaseBuilder from './BaseBuilder';

export declare class MosaicSupplyChangeTransaction extends VerifiableTransaction {
    static loadFromBinary(binary): BufferProperties;

    static loadEmbeddedFromBinary(binary): BufferProperties; 
}

export declare module MosaicSupplyChangeTransaction {

    class Builder extends BaseBuilder{

        addMosaicId(mosaicName): Builder;

        addDirection(direction): Builder;

        addDelta(delta): Builder;

        build(): MosaicSupplyChangeTransaction;

    }
}