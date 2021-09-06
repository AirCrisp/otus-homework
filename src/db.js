export const initModels = async (knex) => {
  const hasUsers = await knex.schema.hasTable('aircrisp_user');
  console.log(`Users are ${hasUsers}`);
  if (!hasUsers) {
    return knex.schema.createTable('aircrisp_user', function(t) {
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
    this.table = 'aircrisp_user';
    this.conn = connection;
  }

  async createOne(userData) {
    return this
      .conn(this.table)
      .insert(userData)
      .returning('*');
  }
  async updateOne(userData) {
    return this
      .conn(this.table)
      .update(userData)
      .returning('*');
  }
  async findOne(userId) {
    return this
      .conn(this.table)
      .where('id', userId);
  }
  async findAll() {
    return this
      .conn(this.table)
      .select('*')
      .limit(100)
      .offset(0);
  }
  async deleteOne(userId) {
    return this
      .conn(this.table)
      .where('id', userId)
      .del();
  }
};