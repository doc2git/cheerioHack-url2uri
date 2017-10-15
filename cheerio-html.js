var fs = require('fs');
var async = require('async');
var cheerio = require('cheerio');
var replaceUri = require('./replace-uri');
var config = require('./config');

// var replacedHtml = '';

module.exports = function (fileName) {

    function readHtml(next) {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) console.error(err);
            next(null, data)
        });
    }

    // function cheerioAtrr() {
    //     console.log(htmlStr)
    //     const $ = cheerio.load(htmlStr);
    //     $('h2.title').text('Hello there!')
    //     // $('h2').addClass('welcome')
    //     $.html()
    //     return cheerio;
    // }
    return new Promise((resolve, reject) => {
        async.waterfall([
            function (next) {
                console.log('Start to processing ' + fileName + ' ... ');
                readHtml(next)
            }, function (data, next) {
                let $ = cheerio.load(data)
                // $('html img').each((index,item)=>{
                //     console.log($(item).attr('src'))
                // });
                $('html *').each((index, item) => {
                    var ele = $(item)[0]
                    // console.log(ele);
                    if (ele.attribs.src) {
                        // console.log('origin: ', ele.attribs.src);
                        ele.attribs.src = replaceUri(fileName, ele.attribs.src, config);
                        // console.log('replaced: ', ele.attribs.src);
                    }
                    if (ele.attribs.href) {
                        // console.log('origin: ', ele.attribs.href);
                        ele.attribs.href = replaceUri(fileName, ele.attribs.href, config);
                        // console.log('replaced: ', ele.attribs.href);
                    }
                })
                next(null, $);
            }, function ($) {
                // $('html').each((index, item) => {
                //     var ele = $(item)
                //     // console.log(ele);
                //     // if (ele.attribs.src) {
                //     //     console.log('replaced: ', ele.attribs.src);
                //     // }
                //     // if (ele.attribs.href) {
                //     //     console.log('replaced: ', ele.attribs.href);
                //     // }
                //     console.log('60+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                //     console.log(ele, '59********');
                // })
                let html = $('html');
                let attribs = html[0].attribs;
                let inlineAttr = ``;
                for (attr in attribs) {
                    inlineAttr += ` ${attr}="${attribs[attr]}"`;
                }
                replacedHtml = `<!doctype html><html${inlineAttr}>` + $('html').html() + '</html>';
                // console.log('62#################################', replacedHtml);
                resolve(replacedHtml);
            }
        ], err => {
            if (err) {
                // console.warn(err);
                reject(err);
            } else {
                let $ = cheerio.load(data);
                // console.log($('html *'), '55---++++++');
                console.log('Processed ' + fileName + ', All Done!');
            }
        });
    });
};

// module.exports = {
//     cheerioReplaceAllUri,
//     replacedHtml
// }
// module.exports('/var/www/html/bootstrap.doc2git.com/docs/4.0/examples/cover/index.html');


