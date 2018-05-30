const auth = {
  me: (parent, args, ctx, info) => ctx.db.query.me(args, ctx.request, info)
};

module.exports = { auth };
