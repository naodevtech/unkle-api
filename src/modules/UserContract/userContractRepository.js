class UserContractRepository {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  async getAllUserContractsByUser(id) {
    const userContract = await this.db.UserContract.findAll({
      where: { userId: id },
      include: [{ model: this.db.Contract }]
    });
    if (!userContract) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucun utilisateur à cet ID  😖"
      );
    }
    return userContract;
  }

  async createUserContractByUser(userContract) {
    const userContractIsExist = await this.db.UserContract.findOne({
      where: {
        contractId: userContract.contractId,
        userId: userContract.userId
      }
    });
    if (userContractIsExist) {
      throw new this.apiError(
        400,
        "Il semble qu'il y ai déjà un conƒtrat affilié à cet utilisateur 😖"
      );
    }
    return await this.db.UserContract.create(userContract);
  }

  async deleteUserContractById(id) {
    const userContractIsExist = await this.db.UserContract.findOne({
      where: { id: id }
    });
    if (!userContractIsExist) {
      throw new this.apiError(
        400,
        "Il semble que l'affiliation de contrat que vous voulez supprimer n'existe pas/plus 😖"
      );
    }
    return await this.db.UserContract.destroy({ where: { id: id } });
  }
}
export default UserContractRepository;
