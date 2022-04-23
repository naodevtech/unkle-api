class ContractController {
  constructor({
    contractService,
    configCloudinary,
    responseHandler,
    ApiError
  }) {
    this.contractService = contractService;
    this.configCloudinary = configCloudinary;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  getAllContracts = async (request, response, next) => {
    try {
      let contracts = await this.contractService.getAllContracts();
      this.responseHandler(response, 201, contracts, `Toutes les contrats 📚`);
    } catch (err) {
      next(err);
    }
  };

  getContract = async (request, response, next) => {
    try {
      let contract = await this.contractService.getContract(request.params.id);
      this.responseHandler(response, 201, contract);
    } catch (err) {
      next(err);
    }
  };

  createContract = async (request, response, next) => {
    try {
      if (!request.file) {
        throw new this.ApiError(
          400,
          "Il semble que vous n'ayez pas ajouté d'icône au contrat ❌ "
        );
      }
      const result = await this.configCloudinary.uploader.upload(
        request.file.path
      );
      if (!result) {
        throw new this.ApiError(
          400,
          "Il semble qu'il y ait une erreur lors de l'upload de l'icône ❌ "
        );
      }
      let contract = await this.contractService.createContract({
        icon: result.secure_url,
        reference: request.body.reference,
        name: request.body.name,
        description: request.body.description,
        status: request.body.status
      });
      this.responseHandler(
        response,
        201,
        contract,
        `Nouveau contrat ajouté ! 📘`
      );
    } catch (err) {
      next(err);
    }
  };

  getContract = async (request, response, next) => {
    try {
      let contract = await this.contractService.getContract(request.params.id);
      this.responseHandler(response, 201, contract);
    } catch (err) {
      next(err);
    }
  };

  deleteContract = async (request, response, next) => {
    try {
      let contract = await this.contractService.deleteContract(
        request.params.id
      );
      this.responseHandler(response, 200, contract, 'Contrat supprimé ✅');
    } catch (err) {
      next(err);
    }
  };
}

export default ContractController;
