'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const is = require('valido');
const config = require('./config');
let cheerioHtml = require('./cheerio-html');

// var write = (callback, filePath, strContent) => {
//     filePath = callback(filePath);
//     return function (filePath) {
//         fs.writeFile(filePath, strContent, 'utf8', err => {
//             if (err) console.error(err);
//             console.log(filePath + ' has been converted!\n');
//         });
//     }
// }

module.exports = function schedule(config, ...args) {
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

        var content = cheerioHtml(itemName);

        var promiseHtml = new Promise((resolve, reject) => {
            resolve(content)
            // resolve(fs.readFileSync(itemName, 'utf8'))
        });
        promiseHtml.then(function (content) {
            console.log(content, '48 index, &&&&&&&&&');
            fs.writeFile(itemName, content, (err, data) => {
                console.error(err);
                console.log(itemName + ' has been replaced!');
            });
        })
        // promiseHtml
        //     .then(function (itemName) {
        //         cheerioHtml.cheerioReplaceAllUri(itemName)
        //         return cheerioHtml;
        //     })
        //     .then(function (cheerioHtml) {
        //         var content = cheerioHtml.replacedHtml;
        //         console.log(content, '52**&&&&&&&&&&&&&&&&&&&&&');
        //         // write(fnRenameFileRule, itemName, content);
        //     })
        // //     .then(function (content) {
        // //     write(fnRenameFileRule, itemName, content);
        // // });
    });
};


