var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
app.get('/', function(req, res){
    request('http://shop.51ruanron.com/index.php/home/list/plan/id/1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器
            var items = [];
            $('.column_one').each(function (idx, element) {
                var tem  = {};
                var $element = $(element);
                tem.img = 'http://shop.51ruanron.com' + $element.children('img').attr('src');
                tem.h2 = $element.children('h2').text();
                tem.h3 = $element.children('h3').text();
                items.push(tem);
            });
            console.log(items);
            res.send(items);


        }else{
            console.log("gg,没爬取到，再来一次");
        }
    })
});
app.listen(3000,function(){
    console.log('app is listening at port 3000');
});