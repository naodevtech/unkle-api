import SubscribtionEntity from './subscribtionEntity';

class SubscribtionService {
  constructor({ subscribtionRepository, ApiError }) {
    this.subscribtionRepository = subscribtionRepository;
    this.apiError = ApiError;
  }

  async getAllSubscribtionsByUser(id) {
    return await this.subscribtionRepository.getAllSubscribtionsByUser(id);
  }

  async getAllSubscribtionsByContract(id) {
    return await this.subscribtionRepository.getAllSubscribtionsByContract(id);
  }

  async createSubscribtion(subscribtion) {
    const subscribtionEntity = new SubscribtionEntity(subscribtion);
    if (!subscribtionEntity.validate()) {
      throw new this.apiError(
        400,
        "Veuillez renseignez un contrat ainsi qu'un client ❌"
      );
    }
    if (!subscribtionEntity.checkStatus()) {
      throw new this.apiError(
        400,
        'Veuillez renseignez un status correct (pending, active, finished, resilied) ❌'
      );
    }
    return await this.subscribtionRepository.createSubscribtion(subscribtion);
  }

  async updateSubscribtionStatusById(id, subscribtion) {
    const subscribtionEntity = new SubscribtionEntity(subscribtion);
    if (!subscribtionEntity.checkStatus()) {
      throw new this.apiError(
        400,
        'Veuillez renseignez un status correct (pending, active, finished, resilied) ❌'
      );
    }
    return await this.subscribtionRepository.updateSubscribtionStatusById(
      id,
      subscribtion
    );
  }

  async cancelSubscribtionById(id, subscribtion) {
    const subscribtionEntity = new SubscribtionEntity(subscribtion);
    if (!subscribtionEntity.checkStatus()) {
      throw new this.apiError(
        400,
        'Veuillez renseignez un status correct (pending, active, finished, resilied) ❌'
      );
    }
    return await this.subscribtionRepository.cancelSubscribtionById(
      id,
      subscribtion
    );
  }
}

export default SubscribtionService;
