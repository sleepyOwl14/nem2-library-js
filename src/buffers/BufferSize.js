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

 const OptionalFieldSize = {
     RegisterNamespace:{
        duration: 8,
        parentId: 8,
     } 
 }

 const BufferSize = {

    UnresolvedMosaic: 16,
    Mosaic : 16,
    AddressPropertyModification: 26,
    CosignatoryModification: 33,
    TransactionTypePropertyModification: 3,
    MosaicPropertyModification: 9,
    MosaicProperty: 9,
    PropertyModification: 1,
    AccountLinkBaseSize:{
        body : 33,
        main : 153,
        embedded : 73,
    },
    AddressPropertyBaseSize:{
        body : 2,
        main : 122,
        embedded : 42,
    },
    TransactionTypePropertyBaseSize:{
        body : 2,
        main : 122,
        embedded : 42,
    },
    MosaicPropertyBaseSize:{
        body : 2,
        main : 122,
        embedded : 42,
    },
    AddressAliasBaseSize:{
        body : 34,
        main : 154,
        embedded : 74,
    },
    AggregateBaseSize:{
        main : 124,
    },
    HashLockBaseSize:{
        body : 40,
        main : 160,
        embedded : 80,
    },
    ModifyMultisigAccountBaseSize:{
        body : 3,
        main : 123,
        embedded : 43,
    },
    MosaicAliasBaseSize:{
        body : 17,
        main : 137,
        embedded : 57,
    },
    MosaicDefinitionBaseSize:{
        body : 15,
        main : 135,
        embedded : 55,
    },
    MosaicSupplyChangeBaseSize:{
        body : 17,
        main : 137,
        embedded : 57,
    },
    RegisterNamespaceBaseSize:{
        body : 10,
        main : 130,
        embedded : 50,
    },
    SecretLockBaseSize:{
        body : 66,
        main : 186,
        embedded : 106,
    },
    SecretProofBaseSize:{
        body : 35,
        main : 155,
        embedded : 75,
    },
    TransferBaseSize:{
        body : 28,
        main : 148, // 120 + 28
        embedded : 68, // 40 + 28
    },
    TransactionBaseSize:{
        main : 120,
        embedded : 40
    },
    SizePrefixedEntity: 4,
    VerifiableEntity: 64,
    Entity:{
        body : 36,
    },
 }

 export {OptionalFieldSize, BufferSize};