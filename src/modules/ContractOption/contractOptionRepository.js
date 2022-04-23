class ContractOptionRepository {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  async getAllContractOptionsByContract(id) {
    const contractOption = await this.db.ContractOption.findAll({
      where: { contractId: id },
      attributes: {
        exclude: [
          'id',
          'contractId',
          'createdAt',
          'optionid',
          'updatedAt',
          'optionId'
        ]
      },
      nest: true,
      include: [
        {
          model: this.db.Option,
          nest: true,
          raw: true,
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
          }
        }
      ]
    });
    if (!contractOption) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucune option de contrat à cet ID de contrat 😖"
      );
    }
    return contractOption;
  }

  async createContractOptionByContract(contractOption) {
    const contractOptionIsExist = await this.db.ContractOption.findOne({
      where: { optionId: contractOption.optionId }
    });
    if (contractOptionIsExist) {
      throw new this.apiError(
        400,
        "Il semble qu'il y ai une option identique déjà assignée à ce contrat 😖"
      );
    }
    return await this.db.ContractOption.create(contractOption);
  }

  async deleteContractOptionById(id) {
    const contractOptionIsExist = await this.db.ContractOption.findOne({
      where: { id: id }
    });
    if (!contractOptionIsExist) {
      throw new this.apiError(
        400,
        "Il semble que l'option de contrat que vous voulez supprimer n'existe pas/plus 😖"
      );
    }
    return await this.db.ContractOption.destroy({ where: { id: id } });
  }
}
export default ContractOptionRepository;
