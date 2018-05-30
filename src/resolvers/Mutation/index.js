const { auth } = require('./auth');
const { sale } = require('./sale');

const Mutation = Object.assign({}, auth, sale);

module.exports = Mutation;
