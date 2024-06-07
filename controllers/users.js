const { request, response } = require('express');

const getUser = (req = request, res = response) => {
    res.send('Users works');
}

module.exports = {
    getUser
}