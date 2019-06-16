const db = require('../config/database')();
const bcrypt = require('bcryptjs');

module.exports = function (app) {
    app.get('/create-user', (req,res) => {
        res.render('create-user', {'title': 'Registrering', 'content': 'Opret en profil'} );
    });

    app.post('/create-user', (req, res) => {
        let success = true;
        let errorMessage = '';

        if (req.fields) {
            if (!req.fields.username || req.fields.username.length <= 0) {
                success = false;
                errorMessage = 'Udfyld brugernavn!';
            }
            if (!req.fields.password || req.fields.password.length <= 7) {
                success = false;
                errorMessage = 'Adgangskoden skal have mindst 8 tegn!';
            }
        } else {
            success = false;
            errorMessage = 'Alt er galt';
        }
        
        if (!success) {
            res.render('create-user', {'title': 'Registrering', 'content': 'Opret en profil', 'errorMessage': errorMessage} );
        }
        let hashed_kodeord = bcrypt.hashSync(req.fields.password, 10);
        if (success) {
            db.query(`INSERT INTO users SET username = ?, password = ?`, [req.fields.username, hashed_kodeord], function (err, result) {
                if (err) {
                    return res.send(err);
                }
                res.redirect(`/verification/link/${result.insertId}`);
            })
        }
    });
};