module.exports = exports = function (app, routeToBind) {
    app.use(routeToBind, function (request, response, next) {
            response.json({'current_time': (new Date().toLocaleString())});
            //next(); - there is now any other things to happen latter
        }
    )
}
