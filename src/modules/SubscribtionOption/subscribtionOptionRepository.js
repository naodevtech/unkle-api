class SubscribtionOptionRepository {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  async getAllSubscribtionOptionsBySubscribtion(id) {
    const subscribtionOption = await this.db.SubscribtionOption.findAll({
      where: { subscribtionId: id }
    });
    if (!subscribtionOption) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucune option de souscription à cette souscription 😖"
      );
    }
    return subscribtionOption;
  }

  async createSubscribtionOption(subscribtionOption) {
    const subscribtionOptionIsExist = await this.db.SubscribtionOption.findOne({
      where: {
        subscribtionId: subscribtionOption.subscribtionId,
        contractOptionId: subscribtionOption.contractOptionId
      }
    });
    if (subscribtionOptionIsExist) {
      throw new this.apiError(
        400,
        "Il semble qu'il y ai déjà une option de souscription identique affilié à cette souscription 😖"
      );
    }
    return await this.db.SubscribtionOption.create(subscribtionOption);
  }
}
export default SubscribtionOptionRepository;
