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
      const userContractsDto = [];
      userContracts = userContracts.map((userContract) => {
        userContractsDto.push({
          id: userContract.dataValues.Contract.id,
          reference: userContract.dataValues.Contract.reference,
          icon: userContract.dataValues.Contract.icon,
          name: userContract.dataValues.Contract.name,
          description: userContract.dataValues.Contract.description,
          status: userContract.dataValues.Contract.status,
          beginingDate: userContract.dataValues.beginingDate,
          endDate: userContract.dataValues.endDate,
          createdAt: userContract.dataValues.Contract.createdAt,
          updatedAt: userContract.dataValues.Contract.updatedAt
        });
      });
      this.responseHandler(response, 201, userContractsDto);
    } catch (err) {
      next(err);
    }
  };

  getUserContractById = async (request, response, next) => {
    try {
      let userContract = await this.userContractService.getUserContractById(
        request.params.userId,
        request.params.contractId
      );
      const userContractDto = {
        id: userContract.dataValues.Contract.id,
        reference: userContract.dataValues.Contract.reference,
        icon: userContract.dataValues.Contract.icon,
        name: userContract.dataValues.Contract.name,
        description: userContract.dataValues.Contract.description,
        status: userContract.dataValues.Contract.status,
        beginingDate: userContract.dataValues.beginingDate,
        endDate: userContract.dataValues.endDate,
        createdAt: userContract.dataValues.Contract.createdAt,
        updatedAt: userContract.dataValues.Contract.updatedAt,
        ContractOptions: userContract.dataValues.Contract.ContractOptions
      };

      this.responseHandler(response, 201, userContractDto);
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
