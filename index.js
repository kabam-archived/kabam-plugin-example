module.exports = exports = function (request, response, next) {
    response.json({'current_time': (new Date().toLocaleString())});
    //next(); - there is now any other things to happen latter
}
