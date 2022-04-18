import ContractEntity from './contractEntity';

class ContractService {
  constructor({ contractRepository, ApiError }) {
    this.contractRepository = contractRepository;
    this.apiError = ApiError;
  }

  async getAllContracts() {
    return await this.contractRepository.getAllContracts();
  }

  async createContract(contract) {
    const contractEntity = new ContractEntity(contract);
    if (!contractEntity.validate()) {
      throw new this.apiError(400, 'Il y a des champs manquant ❌');
    }
    if (!contractEntity.checkStatus()) {
      throw new this.apiError(400, "Le status n'est pas reconnu ❌");
    }
    return await this.contractRepository.createContract(contract);
  }

  async getContract(id) {
    return await this.contractRepository.getContractById(id);
  }

  async deleteContract(id) {
    return await this.contractRepository.deleteContractById(id);
  }
}

export default ContractService;
