const { auth } = require('./auth');
const { instance } = require('./instance');
const { memberCard } = require('./memberCard');

const Query = Object.assign({}, auth, instance, memberCard);

module.exports = Query;
