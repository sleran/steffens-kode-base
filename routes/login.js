module.exports = function (app) {
    app.get('/login', (req, res, next) => {
        res.send('Login side!');
    });
    
    app.post('/login', (req, res, next) => {
        res.send('Nu skal der logges ind');
    });
};