class UserContractController {
  constructor({ userContractService, responseHandler, ApiError }) {
    this.userContractService = userContractService;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  getAllUserContractsByUser = async (request, response, next) => {
    try {
      let userContracts =
        await this.userContractService.getAllUserContractsByUser(
          request.params.id
        );
      this.responseHandler(response, 201, userContracts);
    } catch (err) {
      next(err);
    }
  };

  createUserContractByUser = async (request, response, next) => {
    try {
      let userContract =
        await this.userContractService.createUserContractByUser({
          ...request.body
        });
      this.responseHandler(
        response,
        201,
        userContract,
        `Nouveau contrat affilié à un client ! 📘`
      );
    } catch (err) {
      next(err);
    }
  };

  deleteUserContractById = async (request, response, next) => {
    try {
      let userContract = await this.userContractService.deleteUserContractById(
        request.params.id
      );
      this.responseHandler(
        response,
        200,
        userContract,
        'Contrat affilié à un client correctement supprimé ✅'
      );
    } catch (err) {
      next(err);
    }
  };
}

export default UserContractController;
