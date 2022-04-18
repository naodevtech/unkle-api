class SubscribtionOptionController {
  constructor({ subscribtionOptionService, responseHandler, ApiError }) {
    this.subscribtionOptionService = subscribtionOptionService;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  getAllSubscribtionOptionsBySubscribtion = async (request, response, next) => {
    try {
      let subscribtionOptions =
        await this.subscribtionOptionService.getAllSubscribtionOptionsBySubscribtion(
          request.params.id
        );
      this.responseHandler(response, 201, subscribtionOptions);
    } catch (err) {
      next(err);
    }
  };

  createSubscribtionOption = async (request, response, next) => {
    try {
      let subscribtionOption =
        await this.subscribtionOptionService.createSubscribtionOption({
          ...request.body
        });
      this.responseHandler(
        response,
        201,
        subscribtionOption,
        `Nouvelle option affilié à une souscription ! 📘`
      );
    } catch (err) {
      next(err);
    }
  };
}

export default SubscribtionOptionController;
