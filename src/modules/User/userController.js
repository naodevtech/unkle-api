class UserController {
  constructor({
    userService,
    configCloudinary,
    jwtService,
    responseHandler,
    ApiError
  }) {
    this.userService = userService;
    this.configCloudinary = configCloudinary;
    this.jwt = jwtService;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  register = async (request, response, next) => {
    try {
      if (!request.file) {
        throw new this.ApiError(
          400,
          "Il semble que vous n'ayez pas ajouté d'avatar"
        );
      }
      const result = await this.configCloudinary.uploader.upload(
        request.file.path
      );
      if (!result) {
        throw new this.ApiError(
          400,
          "Il semble qu'il y ait une erreur lors de l'upload de l'image"
        );
      }

      let user = await this.userService.register({
        role: request.body.role,
        avatar: result.secure_url,
        lastname: request.body.lastname,
        firstname: request.body.lastname,
        email: request.body.email,
        password: request.body.password
      });
      this.responseHandler(
        response,
        201,
        user,
        `Bienvenue ${user.dataValues.firstname} 💥`
      );
    } catch (err) {
      next(err);
    }
  };

  login = async (request, response, next) => {
    try {
      let user = await this.userService.login(
        request.body.email,
        request.body.password
      );
      let token = await this.jwt.generateToken({
        id: user.dataValues.id,
        role: user.dataValues.role,
        lastname: user.dataValues.lastname,
        firstname: user.dataValues.firstname,
        email: user.dataValues.email
      });
      response.cookie('auth-cookie', token, {
        secure: true,
        maxAge: 3600000,
        sameSite: 'None'
      });
      this.responseHandler(
        response,
        200,
        {
          id: user.dataValues.id,
          lastname: user.dataValues.lastname,
          firstname: user.dataValues.firstname,
          email: user.dataValues.email,
          role: user.dataValues.role,
          token
        },
        `Bonjour ${user.dataValues.firstname} 💥`
      );
    } catch (err) {
      next(err);
    }
  };

  logout = async (request, response, next) => {
    try {
      response.clearCookie('auth-cookie', {
        sameSite: 'none',
        httpOnly: false,
        secure: true
      });
      this.responseHandler(response, 200, {}, 'Utilisateur déconnecté 🔐');
    } catch (err) {
      next(err);
    }
  };

  me = async (request, response, next) => {
    try {
      const token = await this.jwt.decodeToken(request.cookies['auth-cookie']);
      const user = await this.userService.me(token.id);
      this.responseHandler(
        response,
        200,
        user,
        "L'utilisateur est bien connecté ✅ "
      );
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (request, response, next) => {
    try {
      let userUpdated = this.userService.updateUser(request.params.id, {
        role: request.body.role,
        avatar: request.body.avatar,
        lastname: request.body.lastname,
        firstname: request.body.firstname,
        email: request.body.email
      });
      this.responseHandler(
        response,
        200,
        userUpdated,
        "L'utilisateur a été mis à jour ✅"
      );
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (request, response, next) => {
    try {
      let userDeleted = this.userService.deleteUser(request.params.id);
      this.responseHandler(
        response,
        200,
        userDeleted,
        "L'utilisateur à bien été supprimé ✅ "
      );
    } catch (err) {
      next(err);
    }
  };

  getAllUsers = async (request, response, next) => {
    try {
      let users = await this.userService.getAllUsers();
      this.responseHandler(response, 200, users, 'Tous les utilisateur ✅');
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (request, response, next) => {
    try {
      let user = await this.userService.getUser(request.params.id);
      this.responseHandler(response, 200, user);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
