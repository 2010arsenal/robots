/**
 * Created by lx on 2017/4/20.
 */
var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req,res) {
    //Node提供了几个修改HTTP响应头的方法：res.setHeader(field, value)res.getHeader(field)
    //和res .removeHeader(field)
    // //添加和移除响应头的顺序可以随意，但一定要在调用res.write()或 res.end()之前
    // var body = 'hello world';
    // res.setHeader('Content-Length',body.length);
    // res.setHeader('Content-Type','text/plain');
    // res.end(body);

    // var url = 'http://www.baidu.com';
    // var body = '<p>redirecting to <a href="'+url+'">'+url+'</a><p>';
    // res.setHeader('Location',url);
    // res.setHeader('Content-Length',body.length);
    // res.setHeader('Content-Type','text/html');
    // res.statusCode = 302;
    // res.end(body);

    // req.on('data',function (chunk) {
    //     console.log('parsed',chunk);
    // });
    // //默认是node 二进制数据
    // req.setEncoding('utf8');
    // req.on('end',function(){
    //     console.log('done parsing');
    //     res.end()
    // });


    //POST请求体字符串缓存
    switch (req.method){
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data',function (chunk) {
                item += chunk;
            });
            req.on('end',function () {
                //将完整的新事项压入事项数组中
                items.push(item);
                console.log(items);
                res.end('ok\n');
            });
            break;
        // case 'GET':
        //     items.forEach(function (item,i) {
        //         res.write(i + ')' + item + '\n');
        //     });
        //     res.end();
        //     break;
        case "GET":
            var body = items.map(function (item,i) {
                return i + ')  ' + item;
            }).join('\n');
            //字节长度，一个字符可以有多个字节
            res.setHeader('Content-Length',Buffer.byteLength(body));
            res.setHeader('Content-Type','text/plain;charset="utf-8"');
            res.end(body);
            break;
        //http://localhost:3000/1?api-key=footer
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            // console.log(path);
            //  /1 => 1
            var i = parseInt(path.slice(1),10);
            console.log(i);
            //不是个数字
            if(isNaN(i)){
                res.statusCode = 400;
                res.end('Invalid item id');
            }else if(!items[i]){
                res.statusCode = 404;
                res.end('Item not found');
            }else{
                console.log(items);
                items.splice(i,1);
                console.log(items);
                res.end('ok\n');
            }
            break;
    }
});

server.listen(3000,function () {
    console.log('server listen at port 3000');
});


// http.createServer(function (request,response) {
//     // response.writeHead(200,{'Content-Type':'text-plain'});
//     // response.end('hello World \n');
//     //在回调函数中，除了可以使用request对象访问请求头数据外，
//     // 还能把request对象当作一个只读数据流来访问请求体数据
//     var body_arr = [];
//     console.log(request.method);
//     console.log(request.headers);
//
//     request.on('data',function (chunck) {
//         body_arr.push(chunck);
//     });
//
//     request.on('end',function () {
//         body_arr = Buffer.concat(body_arr);
//         console.log(body_arr.toString());
//
//     })
//
// }).listen(8134,function () {
//     console.log('app is listening at port 8134');
// });