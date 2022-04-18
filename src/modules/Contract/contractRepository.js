class ContractRepository {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  async getAllContracts() {
    const contracts = await this.db.Contract.findAll();
    if (!contracts) {
      throw new this.apiError(400, "Il semble qu'il n'y ai aucun contrats 😖");
    }
    return contracts;
  }

  async createContract(contract) {
    const contractIsExist = await this.db.Contract.findOne({
      where: { reference: contract.reference }
    });
    if (contractIsExist) {
      throw new this.apiError(
        400,
        "Il semble qu'il existe deja un contrat portant la même référence 😖"
      );
    }
    return await this.db.Contract.create(contract);
  }

  async getContractById(id) {
    const contract = await this.db.Contract.findOne({
      where: { id: id }
    });
    if (!contract) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucun contrat à cet ID 😖"
      );
    }
    return contract;
  }

  async deleteContractById(id) {
    const contractIsExist = await this.db.Contract.findOne({
      where: { id: id }
    });
    if (!contractIsExist) {
      throw new this.apiError(
        400,
        "Il semble que le contrat que vous voulez supprimer n'existe pas/plus 😖"
      );
    }
    return await this.db.Contract.destroy({ where: { id: id } });
  }
}
export default ContractRepository;
