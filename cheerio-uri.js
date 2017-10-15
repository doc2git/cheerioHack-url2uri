var fs = require('fs');
var async = require('async');
var cheerio = require('cheerio');

module.exports = function (fileName) {

    function readHtml(next) {
        fs.readFile(fileName, 'utf8', (err, data)=>{
            if(err) console.error(err);
            next(null, data)
        });
    }

    function cheerioAtrr() {
        console.log(htmlStr)
        const $ = cheerio.load(htmlStr);
        $('h2.title').text('Hello there!')
        // $('h2').addClass('welcome')
        $.html()
        return cheerio;
    }

    async.waterfall([
        function (next) {
            readHtml(next)
        }, function (data) {
            let $ = cheerio.load(data)
            // $('html img').each((index,item)=>{
            //     console.log($(item).attr('src'))
            // });
            $('html *').each((index, item) => {
                var ele = $(item)[0]
                // console.log(ele);
                if (ele.attribs.src) console.log(ele.attribs.src);
                if (ele.attribs.href) console.log(ele.attribs.href);
            })
        }
    ], err => console.log('All Done!'));
}
