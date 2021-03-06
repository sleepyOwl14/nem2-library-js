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
/**
 * Catapult REST API Reference
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.12
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';





/**
* The BlockchainStorageInfoDTO model module.
* @module model/BlockchainStorageInfoDTO
* @version 1.0.12
*/
export default class BlockchainStorageInfoDTO {
    /**
    * Constructs a new <code>BlockchainStorageInfoDTO</code>.
    * @alias module:model/BlockchainStorageInfoDTO
    * @class
    * @param numBlocks {Number} 
    * @param numTransactions {Number} 
    * @param numAccounts {Number} 
    */

    constructor(numBlocks, numTransactions, numAccounts) {
        

        
        

        this['numBlocks'] = numBlocks;this['numTransactions'] = numTransactions;this['numAccounts'] = numAccounts;

        
    }

    /**
    * Constructs a <code>BlockchainStorageInfoDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/BlockchainStorageInfoDTO} obj Optional instance to populate.
    * @return {module:model/BlockchainStorageInfoDTO} The populated <code>BlockchainStorageInfoDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new BlockchainStorageInfoDTO();

            
            
            

            if (data.hasOwnProperty('numBlocks')) {
                obj['numBlocks'] = ApiClient.convertToType(data['numBlocks'], 'Number');
            }
            if (data.hasOwnProperty('numTransactions')) {
                obj['numTransactions'] = ApiClient.convertToType(data['numTransactions'], 'Number');
            }
            if (data.hasOwnProperty('numAccounts')) {
                obj['numAccounts'] = ApiClient.convertToType(data['numAccounts'], 'Number');
            }
        }
        return obj;
    }

    /**
    * @member {Number} numBlocks
    */
    numBlocks = undefined;
    /**
    * @member {Number} numTransactions
    */
    numTransactions = undefined;
    /**
    * @member {Number} numAccounts
    */
    numAccounts = undefined;








}


