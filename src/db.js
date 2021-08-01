export const initModels = async (knex) => {
  const hasUsers = await knex.schema.hasTable('aircrisp_user');
  console.log(`Users are ${hasUsers}`);
  if (!hasUsers) {
    return knex.schema.createTable('user', function(t) {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.string('firstName');
      t.string('lastName');
      t.string('username', 256);
      t.string('email');
      t.string('phone');
    });
  }
};

export class UserRepo {
  constructor(connection) {
    this.qb = connection('aircrisp_user');
  }

  async createOne(userData) {
    return this.qb.insert(userData).returning('*')
  }
  async updateOne(userData) {
    return this.qb.update(userData).returning('*')
  }
  async findOne(userId) {
    console.log(this.qb);
    console.log(userId);
    return this.qb.where('id', userId);
  }
  async deleteOne(userId) {
    return this.qb.where('id', userId).del();
  }
};