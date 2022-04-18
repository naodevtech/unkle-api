import ContractOptionEntity from './contractOptionEntity';

class ContractOptionService {
  constructor({ contractOptionRepository, ApiError }) {
    this.contractOptionRepository = contractOptionRepository;
    this.apiError = ApiError;
  }

  async getAllContractOptionsByContract(id) {
    return await this.contractOptionRepository.getAllContractOptionsByContract(
      id
    );
  }

  async createContractOptionByContract(contractOption) {
    const contractOptionEntity = new ContractOptionEntity(contractOption);
    if (!contractOptionEntity.validate()) {
      throw new this.apiError(
        400,
        "Veuillez renseignez une option ainsi qu'un contrat ❌"
      );
    }
    return await this.contractOptionRepository.createContractOptionByContract(
      contractOption
    );
  }

  async deleteContractOptionById(id) {
    return await this.contractOptionRepository.deleteContractOptionById(id);
  }
}

export default ContractOptionService;
