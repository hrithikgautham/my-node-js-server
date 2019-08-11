const url = require('url');
const obj = {
    protocol: 'http',
    hostname: 'hrithik.com',
    pathname: '/src/home',
    query: {
        id: 1,
        name: "gautham"
    }
}
console.log(url.parse(url.format(obj)));