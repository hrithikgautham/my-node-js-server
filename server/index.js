const http = require('http');
const path = require('path');
const url = require('url');
const methods = require('./utils/methods');
const https = require('https');

const API_KEY = '1801feed-fb6c-4e92-b17e-986fdf66fd89';
const API_URL = `https://public-api.tracker.gg/v2/apex/standard`;
                        
const server = new http.Server({
    allowHalfOpen: false,
    pauseOnConnect: false
}, (req, res) => {
    const headers = methods.getHeaders(req.rawHeaders, ['Cookie']);
    // console.log(headers);
    const URL = req.url.split('?')[0];
    console.log('url: ', URL);
    switch(URL) {
        case '/api/v1/profile': {
            if(url.parse(req.url).query){
                const params = methods.extractURLParams(req);
                const { platform, gamertag } = params;
                if(platform && gamertag)
                    try {
                        https.get('https://jsonplaceholder.typicode.com/todos', getData => {
                            console.log('status: ', getData.statusCode);
                            console.log("headers: ", getData.headers);
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.write(`${platform} ${gamertag}`);
                            getData.on('data', data => res.write(data));
                            getData.on('end', data => res.end(data));
                        }).on('error', (e) => {
                            res.end(JSON.stringify(e));
                        });
                    }catch(err) {
                        console.error('Error: ', err);
                    }
                else
                    methods.send(res, 400, 'BAD REQUEST', {'Content-Type': 'text/html'});
            }else
                methods.send(res, 200, 'NO URL PARAMS', {'Content-Type': 'text/html'});
            break;
        }
        default: {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Page Not Found!</h1>');
        }
    }
});


server.listen(8000, () => console.log('server running on port 8000...'));