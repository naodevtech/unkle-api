class ContractOptionController {
  constructor({ contractOptionService, responseHandler, ApiError }) {
    this.contractOptionService = contractOptionService;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  getAllContractOptionsByContract = async (request, response, next) => {
    try {
      let contractOptions =
        await this.contractOptionService.getAllContractOptionsByContract(
          request.params.id
        );
      this.responseHandler(response, 201, contractOptions);
    } catch (err) {
      next(err);
    }
  };

  createContractOptionByContract = async (request, response, next) => {
    try {
      let option =
        await this.contractOptionService.createContractOptionByContract({
          ...request.body
        });
      this.responseHandler(
        response,
        201,
        option,
        `Nouvelle option affiliée à un contrat ajoutée ! 📘`
      );
    } catch (err) {
      next(err);
    }
  };

  deleteContractOptionById = async (request, response, next) => {
    try {
      let option = await this.contractOptionService.deleteContractOptionById(
        request.params.id
      );
      this.responseHandler(
        response,
        200,
        option,
        'Option affiliée à un contrat supprimée ✅'
      );
    } catch (err) {
      next(err);
    }
  };
}

export default ContractOptionController;
