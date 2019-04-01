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

class bufferUtils{

    static concat_typedarrays = (array1, array2) => {
        var newArray = new Uint8Array(array1.length + array2.length);
        newArray.set(array1);
        newArray.set(array2, array1.length);
        return newArray;
    }

    static fit_bytearray = (array, size) => {
        if (array == null) {
            var newArray = new Uint8Array(size)
            newArray.fill(0)
            return newArray
        }
        if (array.length > size) {
            throw new RangeError("Data size larger than allowed")
        }
        else if (array.length < size) {
            var newArray = new Uint8Array(size)
            newArray.fill(0)
            newArray.set(array, size - array.length)
            return newArray
        }
        return array
    }
 
    static buffer_to_uint = (buffer) => {
        var dataView = new DataView(buffer.buffer)
        if (buffer.byteLength == 1)
            return dataView.getUint8(0, true)
        else if (buffer.byteLength == 2)
            return dataView.getUint16(0, true)
        else if (buffer.byteLength == 4)
            return dataView.getUint32(0, true)
    }
    
    static uint_to_buffer = (uint, bufferSize) => {
        var buffer = new ArrayBuffer(bufferSize)
        var dataView = new DataView(buffer)
        if (bufferSize == 1)
            dataView.setUint8(0, uint, true)
        else if (bufferSize == 2)
            dataView.setUint16(0, uint, true)
        else if (bufferSize == 4)
            dataView.setUint32(0, uint, true)
        return new Uint8Array(buffer)
    }

    static uintArray_to_bufferArray(uintArray, bufferSize){
        
        if(bufferSize == 1){
            return new Uint8Array((uintArray).buffer);  
        }
        else if(bufferSize == 2){
            return new Uint8Array(Uint16Array.from(uintArray).buffer);
        }
        else if(bufferSize == 4){
            return new Uint8Array(Uint32Array.from(uintArray).buffer);
        }   
    }

    static bufferArray_to_uintArray(bufferArray, bufferSize){
        
        if(bufferSize == 1){
            return new Uint8Array(bufferArray.buffer);  
        }
        else if(bufferSize == 2){
            return new Uint16Array(bufferArray.buffer);
        }
        else if(bufferSize == 4){
            return new Uint32Array(bufferArray.buffer);
        }   
    }

    static uint32Array_to_bufferArray(data){
        return this.uintArray_to_bufferArray( data , 4);
    }

    static bufferArray_to_uint32Array(data){
        return Array.from(this.bufferArray_to_uintArray( data , 4));
    }
}

export default bufferUtils;