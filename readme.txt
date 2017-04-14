#nodejs小爬虫
输出事例
[
    {
        "img": "http://shop.51ruanron.com/Public/Uploads/Plan/20170118/587f0aeb5f0dc.png",
        "h2": "互联网+教育",
        "h3": "跨境电商  O2O   生鲜   女装"
    },
    {
        "img": "http://shop.51ruanron.com/Public/Uploads/Plan/20170215/58a4155dbd632.png",
        "h2": "互联网+产业",
        "h3": "P2P贷   众筹    保险   小贷   消费管理"
    }
]

//安装node https://nodejs.org/en/download/   一路next

//node 介绍 https://2010arsenal.github.io/2017/04/13/Node/#more

//创建目录
mkdir robots && npm init


//Express
//Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。
//中文API：http://www.expressjs.com.cn/
//安装express
npm install express --save

//Request
//简化了http请求。
//API：https://www.npmjs.com/package/request
npm install request --save

//Cheerio
//以一种类似JQ的方式处理爬取到的网页。
//API：https://www.npmjs.com/package/cheerio
npm install cheerio --save

touch index.js

node index

//然后在浏览器中访问：http://localhost:3000/
