const auth = {
  login: (parent, args, ctx, info) => ctx.db.mutation.login(args, info)
};

module.exports = { auth };
