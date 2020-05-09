const fs = require('fs');
const request = require('request');

module.exports = (uri, filename, callback) => {
    request.head(uri, () => {
        request(uri).pipe(fs.createWriteStream(`./asset/${filename}`)).on('close', callback);
    });
};
