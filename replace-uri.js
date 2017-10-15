const path = require('path');
const fs = require('fs');
const url = require('url');
const is = require('valido');
const config = require('./config');

module.exports = function (curHtml, innerRelativePath, config) {
    // console.log('10----');

    if (!is.uri(config.baseUri)) {
        throw new TypeError('Invalid baseUri');
    }

    if (!is.string(config.basePath) || !/^\//.test(config.basePath)) {
        throw new TypeError('Invalid basePath');
    }

    if (!is.string(curHtml)) {
        throw new TypeError('Invalid current path');
    }

    if (!is.string(innerRelativePath)) {
        throw new TypeError('Invalid relative path');
    }

    if (is.uri(innerRelativePath)) {
        return innerRelativePath;
    }

    config.basePath = config.basePath.replace(/\/$/, '');
    config.baseUri = config.baseUri.replace(/\/$/, '');
    //var absolutePath = path.resolve(curHtml, '../' + innerRelativePath);
    var absolutePath = url.resolve(curHtml, innerRelativePath);
    // console.log(config.basePath, absolutePath, '0350----');
    return absolutePath.replace(config.basePath, config.baseUri);
}