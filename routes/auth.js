const db = require('../config/database')();
const bcrypt = require('bcryptjs');

module.exports = function (app) {
	
	app.get('/verification/link/:id', (req, res, next) => {
		db.query(`UPDATE users SET verified = 1 WHERE id = ?`, [req.params.id], function (err, result) {
			if (err) {
				return res.send(err);
			}
			req.session.user = req.params.id
			res.render('verification', { title: 'Du er verificeret' });
		})
	});


	app.get('/login', (req, res, next) => {
		if (req.query.status && req.query.status === 'badcredentials') {
			res.locals.status = 'ugyldigt brugernavn eller adgangskode';
		}
		res.render('login', { title: 'Log ind' });
	});

	app.post('/auth/login', (req, res, next) => {
		db.query('SELECT id, password FROM users WHERE username = ?', [req.fields.username], (err, result) => {
			if (err) return next(`${err} at db.query (${__filename}:9:5)`);
			if (result.length !== 1) {
				res.redirect('/login?status=badcredentials');
				return;
			}
			
			if (bcrypt.compareSync(req.fields.password, result[0].password)) {
				req.session.user = result[0].id;
				res.redirect('/profile');
			}
		});
	});

	app.get('/auth/logout', (req, res, next) => {
		req.session.destroy();
		res.redirect('/');
	});
};
