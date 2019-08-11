const url = require('url');

function extractURLParams(req) {
    const params = url.parse(req.url).query.split('&');
    const obj = new Object();
    params.forEach(param => {//extract the parameters
        const temp = param.split('=');
        obj[temp[0]] = temp[1];
    });
    return obj;
}

function getHeaders(arr, request) {
    const obj = new Object();
    var i = 0;
    while(i < arr.length){
        obj[arr[i]] = arr[i+1];
        i+=2;
    }
    const newObj = new Object();
    for(let i of request)
        newObj[i] = obj[i] ? obj[i] : undefined;
    return newObj;
}

function send(res, code, message, headers) {
    res.writeHead(code, headers);
    res.write(`<h1>${message}</h1>`);
    res.end();
}

module.exports = { extractURLParams, getHeaders, send };