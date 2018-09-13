/***
Copyright 2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
***/

'use strict';

var mongoose = require('mongoose');

//If it isn't production, use the local env file
if(!process.env.NODE_ENV || process.env.NODE_ENV.toUpperCase() !== 'PRODUCTION'){
    const env = require('env2')('./conf/.env');
}

//mongoose promise os deprecated. Use the global
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI,{
    useMongoClient: true
}).then(
    ()  => { console.log('Successful mongodb connection') 
},
err => { console.error('Error: Could not connect to MongoDB.') }
);


/**
 * @fileoverview
 * The main KCL namespace exports user-facing modules and public functions.
 * Note that private modules and private functions may change at a future date without notice.
 */
module.exports = require("./lib/kcl/kcl_process");