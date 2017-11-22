// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html');
    },
    'POST /setdomain': async (ctx, next) => {
        ctx.render('panel.html');
    }
};