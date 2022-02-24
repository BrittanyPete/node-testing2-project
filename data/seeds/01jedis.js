
exports.seed = function(knex) {
  return knex('jedis').truncate()
    .then(function () {
      return knex('jedis').insert([
        {name: 'yoda'},
        {name: 'luke skywalker'},
        {name: 'obi wan kanobe'}
      ]);
    });
};
