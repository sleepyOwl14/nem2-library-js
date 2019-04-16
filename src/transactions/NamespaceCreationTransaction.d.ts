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

export declare class NamespaceCreationTransaction extends VerifiableTransaction {
    static loadFromBinary(binary): BufferProperties;

    static loadEmbeddedFromBinary(binary): BufferProperties; 
}

export declare module NamespaceCreationTransaction {

    class Builder extends BaseBuilder{

        addNamespaceType(namespaceType): Builder;

        addDuration(duration): Builder;

        addParentId(parentId): Builder;

        addNamespaceId(namespaceId): Builder;

        addNamespaceName(namespaceName): Builder;

        build(): NamespaceCreationTransaction;

    }
}