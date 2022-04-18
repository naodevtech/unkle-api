class OptionController {
  constructor({ optionService, responseHandler, ApiError }) {
    this.optionService = optionService;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  getAllOptions = async (request, response, next) => {
    try {
      let options = await this.optionService.getAllOptions();
      this.responseHandler(response, 201, options, `Toutes les options 📚`);
    } catch (err) {
      next(err);
    }
  };

  getOption = async (request, response, next) => {
    try {
      let option = await this.optionService.getOption(request.params.id);
      this.responseHandler(response, 201, option);
    } catch (err) {
      next(err);
    }
  };

  createOption = async (request, response, next) => {
    try {
      let option = await this.optionService.createOption({
        ...request.body
      });
      this.responseHandler(
        response,
        201,
        option,
        `Nouvelle option ajoutée ! 📘`
      );
    } catch (err) {
      next(err);
    }
  };

  deleteOption = async (request, response, next) => {
    try {
      let option = await this.optionService.deleteOption(request.params.id);
      this.responseHandler(response, 200, option, 'Option supprimée ✅');
    } catch (err) {
      next(err);
    }
  };

  updateOption = async (request, response, next) => {
    try {
      let option = await this.optionService.updateOption(request.params.id, {
        ...request.body
      });
      this.responseHandler(response, 200, option, 'Option mise à jour ✅');
    } catch (err) {
      next(err);
    }
  };
}

export default OptionController;
