const fs = require('fs');

module.exports = app => {
    app.get('*', (req, res) => {
        const readable = fs.createReadStream(`./build/index.html`);

        res.set('Content-Type', 'text/html');
        readable.pipe(res);
    });
};
