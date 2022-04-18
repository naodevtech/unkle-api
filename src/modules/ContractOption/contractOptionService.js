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
    return await this.contractOptionRepository.createContractOptionByContract(
      contractOption
    );
  }

  async deleteContractOptionById(id) {
    return await this.contractOptionRepository.deleteContractOptionById(id);
  }
}

export default ContractOptionService;
