import SubscribtionOptionEntity from './subscribtionOptionEntity';

class SubscribtionOptionService {
  constructor({ subscribtionOptionRepository, ApiError }) {
    this.subscribtionOptionRepository = subscribtionOptionRepository;
    this.apiError = ApiError;
  }

  async getAllSubscribtionOptionsBySubscribtion(id) {
    return await this.subscribtionOptionRepository.getAllSubscribtionOptionsBySubscribtion(
      id
    );
  }

  async createSubscribtionOption(subscribtionOption) {
    const subscribtionOptionEntity = new SubscribtionOptionEntity(
      subscribtionOption
    );
    if (!subscribtionOptionEntity.validate()) {
      throw new this.apiError(
        400,
        "Veuillez renseignez une souscription ainsi qu'une option de contrat❌"
      );
    }
    return await this.subscribtionOptionRepository.createSubscribtionOption(
      subscribtionOption
    );
  }
}

export default SubscribtionOptionService;
