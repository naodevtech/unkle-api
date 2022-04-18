class AuthMiddleWare {
  constructor({ jwtService, ApiError }) {
    this.jwt = jwtService;
    this.apiError = ApiError;
  }

  isAuthentificated = async (request, response, next) => {
    try {
      const token = request.cookies['auth-cookie'];
      if (!token) {
        throw new this.apiError(
          401,
          'Votre session a expirée. Veuillez vous reconnecter 😣'
        );
      }

      const decoded = await this.jwt.decodeToken(token);

      request.currentUserId = decoded.id;
      next();
    } catch (err) {
      next(err);
    }
  };

  isClient = async (request, response, next) => {
    try {
      const token = request.cookies['auth-cookie'];
      const decoded = await this.jwt.decodeToken(token);
      if (decoded.data.role !== 'client') {
        throw new this.apiError(
          401,
          "Vous n'avez pas les droits pour effectuer cette requête lié uniquement au client ❌"
        );
      }
      request.currentUserId = decoded.id;
      next();
    } catch (err) {
      next(err);
    }
  };

  isAdmin = async (request, response, next) => {
    try {
      const token = request.cookies['auth-cookie'];
      const decoded = await this.jwt.decodeToken(token);
      if (decoded.data.role !== 'admin') {
        throw new this.apiError(
          401,
          "Vous n'avez pas les droits pour effectuer cette requête lié à l'administrateur ❌"
        );
      }
      request.currentUserId = decoded.id;
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default AuthMiddleWare;
