module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('main', { 'title': 'Kodebasen byder dig velkommen!', 'content': 'Her er der indhold' });
    });
};