import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // senha virtual
        password_hash: Sequelize.STRING, // senha hash
      },
      {
        sequelize,
      }
    );
    // depois de salvar, verificar se o campo virtual de password foi preenchido, e criptografalo o enviando para a nossa variavel passHash
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 6);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
