module.exports = (app, dbConnection) => {
    app.get('/chat-api/messages', (req, res) => {

        dbConnection.query('CALL getMessages()', (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send(results[0]);
            }
        });
    });
};