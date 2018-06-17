const auth = {
  me: async (parent, args, ctx, info) => ctx.db.query.me(args, info)
};

module.exports = { auth };
