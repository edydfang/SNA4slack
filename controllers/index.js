const staticFiles = require('../static-files');
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function getPages(pagename) {
    return async (ctx, next) => {
        let rpath = pagename;
        let fp = path.join(__dirname + '/../static/', rpath);
        if (await fs.exists(fp)) {
            ctx.response.type = mime.lookup(rpath);
            ctx.response.body = await fs.readFile(fp);
        } else {
            ctx.response.status = 404;
        }
    };
}


module.exports = {
    'GET /': getPages('index.html'),
    'GET /index.html': getPages('index.html')
};

