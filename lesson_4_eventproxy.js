var eventproxy = require('eventproxy');//https://github.com/JacksonTian/eventproxy
var superagent = require('superagent');//http://visionmedia.github.io/superagent/
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var url = require('url');

var cnodeUrl = 'http://cnodejs.org';

app.get('/',function(req,resp){
    superagent.get(cnodeUrl).end(function (err,res) {
        if(err){
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx,element) {
            var $elememt = $(element);
            var href   = url.resolve(cnodeUrl,$elememt.attr('href'));
            topicUrls.push(href);
        });
        console.log(topicUrls);//获得所有的链接
        console.log(topicUrls.length);
        // resp.send(topicUrls);

        var eq = new eventproxy();
        // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
        eq.after('topic_html',topicUrls.length,function (toppics) {
            var arr = [];
            // console.log(typeof toppics);
            toppics.map(function (topicPair) {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                arr.push({
                    title:$('.topic_full_title').text().trim(),
                    href: topicUrl,
                    // content:$('.markdown-text').text()
                    // comment1:$('.reply_content').eq(0).text().trim()
                });
            });
            // console.log('final:');
            // console.log(topics);
            resp.send(arr);
        });

        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl).end(function (err,res) {
                console.log('fetch ' + topicUrl + ' successful');
                eq.emit('topic_html', [topicUrl, res.text]);
            })
        })
    });
});
app.listen(3000,function(err){
    console.log('app is listening at port 3000');
});
