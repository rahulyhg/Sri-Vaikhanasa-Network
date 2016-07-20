'use strinct';

module.exports = function (app) {
    // registering all routing modules
    require('../routes/article')(app);
    require('../routes/user')(app);
}