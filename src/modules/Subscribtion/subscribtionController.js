class SubscribtionController {
  constructor({ subscribtionService, responseHandler, ApiError }) {
    this.subscribtionService = subscribtionService;
    this.responseHandler = responseHandler;
    this.ApiError = ApiError;
  }

  getAllSubscribtionsByUser = async (request, response, next) => {
    try {
      let subscribtions =
        await this.subscribtionService.getAllSubscribtionsByUser(
          request.params.id
        );
      this.responseHandler(response, 201, subscribtions);
    } catch (err) {
      next(err);
    }
  };

  getAllSubscribtionsByContract = async (request, response, next) => {
    try {
      let subscribtions =
        await this.subscribtionService.getAllSubscribtionsByContract(
          request.params.id
        );
      this.responseHandler(response, 201, subscribtions);
    } catch (err) {
      next(err);
    }
  };

  createSubscribtion = async (request, response, next) => {
    try {
      let option = await this.subscribtionService.createSubscribtion({
        ...request.body
      });
      this.responseHandler(
        response,
        201,
        option,
        `Nouvelle souscription créée ! 📘`
      );
    } catch (err) {
      next(err);
    }
  };

  cancelSubscribtionById = async (request, response, next) => {
    try {
      let subscribtion = await this.subscribtionService.cancelSubscribtionById(
        request.params.id,
        {
          ...request.body
        }
      );
      this.responseHandler(
        response,
        200,
        subscribtion,
        'Souscription résiliée ! ✅'
      );
    } catch (err) {
      next(err);
    }
  };
}

export default SubscribtionController;
