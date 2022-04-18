import UserEntity from './userEntity';

class UserService {
  constructor({ userRepository, ApiError }) {
    this.userRepository = userRepository;
    this.apiError = ApiError;
  }

  async register(user) {
    const userEntity = new UserEntity(user);
    if (!userEntity.validate()) {
      throw new this.apiError(400, 'Il y a des champs manquant ❌');
    }
    if (!userEntity.checkRole()) {
      throw new this.apiError(400, "Le role n'est pas reconnu ❌");
    }
    if (!userEntity.checkEmail()) {
      throw new this.apiError(400, "l'email n'est pas dans le bon format ❌");
    }
    if (!userEntity.checkPassword()) {
      throw new this.apiError(
        400,
        'le mot de passe doit contenir entre 8 et 15 caractères, une majuscule, un chiffre et un caractère spécial ❌'
      );
    }
    return await this.userRepository.createUser(userEntity);
  }

  async login(email, password) {
    return await this.userRepository.checkCredentials(email, password);
  }

  async me(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new this.apiError(
        400,
        "l'utilisateur demandé n'existe pas sous cet ID ❌"
      );
    return new UserEntity(user);
  }

  async updateUser(id, user) {
    return await this.userRepository.updateUser(id, user);
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }

  async getAllUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(id) {
    return await this.userRepository.getUserById(id);
  }
}

export default UserService;
