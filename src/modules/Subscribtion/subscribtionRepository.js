class SubscribtionRepository {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  async getAllSubscribtionsByUser(id) {
    const subscribtion = await this.db.Subscribtion.findAll({
      where: { userId: id }
    });
    if (!subscribtion) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucun utilisateur à cet ID  😖"
      );
    }
    return subscribtion;
  }
  async getAllSubscribtionsByContract(id) {
    const subscribtion = await this.db.Subscribtion.findAll({
      where: { contractId: id }
    });
    if (!subscribtion) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucun contrat à cet ID  😖"
      );
    }
    return subscribtion;
  }

  async createSubscribtion(subscribtion) {
    const subscribtionIsExist = await this.db.Subscribtion.findOne({
      where: {
        userId: subscribtion.userId,
        contractId: subscribtion.contractId
      }
    });
    if (subscribtionIsExist) {
      throw new this.apiError(
        400,
        "Il semble qu'il y ai une  déjà un contrat identique assigné 😖"
      );
    }
    return await this.db.Subscribtion.create(subscribtion);
  }

  async updateSubscribtionStatusById(id, subscribtion) {
    const subscribtionIsExist = await this.db.Subscribtion.findOne({
      where: { id: id }
    });
    if (!subscribtionIsExist) {
      throw new this.apiError(
        400,
        "Il semble que la souscription de contrat que vous voulez supprimer n'existe pas/plus 😖"
      );
    }
    return await this.db.Subscribtion.update(
      { subscribtion },
      { where: { id: id } }
    );
  }
  async cancelSubscribtionById(id, subscribtion) {
    const subscribtionIsExist = await this.db.Subscribtion.findOne({
      where: { id: id }
    });
    if (!subscribtionIsExist) {
      throw new this.apiError(
        400,
        "Il semble que la souscription de contrat que vous voulez resilié n'existe pas/plus 😖"
      );
    }
    return await this.db.Subscribtion.update(
      { subscribtion },
      { where: { id: id } }
    );
  }
}
export default SubscribtionRepository;
