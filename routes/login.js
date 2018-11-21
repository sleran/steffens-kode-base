module.exports = function (app) {
    app.get('/login', (req, res) => {
        res.render('login', { 'title': 'Log in'});
    });
     app.post('/login', (req, res) => {
        db.query(`SELECT id FROM database.users WHERE username = ? AND passphrase = ?`, [req.body.username, req.body.passphrase], (err, result) => {
            if (err) return res.send(err);
            if (result.length === 1) {
                req.session.user = result[0].id;
                res.redirect('/admin');
            } else {
                res.redirect('/login');
            }
        });
    });
     app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
};