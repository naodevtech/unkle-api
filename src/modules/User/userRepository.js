class UserRepository {
  constructor({ db, bcrypt, ApiError }) {
    this.db = db;
    this.bcrypt = bcrypt;
    this.apiError = ApiError;
  }

  async createUser(userData) {
    const salt = this.bcrypt.genSaltSync(10);
    userData.password = this.bcrypt.hashSync(userData.password, salt);
    const userExist = await this.db.User.findOne({
      where: { email: userData.email }
    });
    if (userExist) {
      throw new this.apiError(
        400,
        'Un utilisateur existe déjà sous cet adresse e-mail ❌'
      );
    } else {
      return await this.db.User.create(userData);
    }
  }

  async checkCredentials(email, password) {
    const userExist = await this.db.User.findOne({ where: { email: email } });
    if (!userExist) {
      throw new this.apiError(
        400,
        'Il ne semble pas y avoir de compte sous cet adresse-email ❌'
      );
    } else {
      let checkPassword = await this.bcrypt.compareSync(
        password,
        userExist.password
      );
      if (!checkPassword) {
        throw new this.apiError(400, 'Mot de passe incorrect ❌');
      }
      return userExist;
    }
  }

  async findById(userId) {
    return await this.db.User.findOne({ where: { id: userId } });
  }

  async updateUser(id, user) {
    const userExist = await this.db.User.findOne({
      where: { id: id }
    });
    if (!userExist) {
      throw new this.apiError(
        400,
        "Il semble que l'utilisateur que vous voulez modifier n'existe pas ❌ "
      );
    }
    return await this.db.User.update(
      {
        role: user.role,
        avatar: user.avatar,
        username: user.username,
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email
      },
      { where: { id: id } }
    );
  }

  async deleteUser(id) {
    const userExist = await this.db.User.findOne({
      where: { id: id }
    });
    if (!userExist) {
      throw new this.apiError(
        400,
        "Il semble que l'utilisateur que vous souhaitez supprimer n'existe pas/plus 😖"
      );
    }
    return await this.db.User.destroy({ where: { id: id } });
  }

  async getUsers() {
    const users = await this.db.User.findAll({
      attributes: ['id', 'role', 'avatar', 'firstname', 'lastname', 'email']
    });
    if (!users) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y a aucun utilisateurs ❌"
      );
    }
    return users;
  }

  async getUserById(id) {
    const user = await this.db.User.findOne({
      attributes: ['id', 'role', 'avatar', 'firstname', 'lastname', 'email'],
      where: { id: id }
    });
    if (!user) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucun utilisateur à cet ID ❌"
      );
    }
    return user;
  }
}
export default UserRepository;
