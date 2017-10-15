'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const is = require('valido');
const config = require('./config');
let cheerioUri = require('./cheerio-uri');

module.exports = function replaceRelativeUriToProtocalUriInHtml(config, ...args) {
    //concat pass in args to config.uriReplaceSrcList
    args = config.uriReplaceSrcList.concat([...args]);
    //default rename file rule function
    let defaultFnRenameFileRule = function (inputFilename) {
        //return inputFilename.replace(/\.html$/, '') + '-converted' + '.html';
        return inputFilename + '.htm';
    };
    //If args[0] is a function, set it as fnRenameFileRule.
    let fnRenameFileRule = args[0];
    if (typeof args[0] === 'function') {
        args[0] = args.slice(-1)[0];
        args.length--;
    } else {
        fnRenameFileRule = defaultFnRenameFileRule;
    }

    // replace uris in args member in args, via iterating args.
    args.forEach(function (itemName) {
        var f = {};


        var promiseHtml = new Promise((resolve, reject) => {
            resolve(itemName)
            // resolve(fs.readFileSync(itemName, 'utf8'))
        });
        promiseHtml
            .then(function(itemName){
                cheerioUri(itemName)
        })
        //     .then(function (content) {
        //     write(fnRenameFileRule, itemName, content);
        // });
    });
};


