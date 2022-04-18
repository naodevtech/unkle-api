import UserContractEntity from './userContractEntity';

class UserContractService {
  constructor({ userContractRepository, ApiError }) {
    this.userContractRepository = userContractRepository;
    this.apiError = ApiError;
  }

  async getAllUserContractsByUser(id) {
    return await this.userContractRepository.getAllUserContractsByUser(id);
  }

  async createUserContractByUser(userContract) {
    const userContractEntity = new UserContractEntity(userContract);
    if (!userContractEntity.validate()) {
      throw new this.apiError(
        400,
        "Veuillez renseignez un contrat ainsi qu'un client ❌"
      );
    }
    return await this.userContractRepository.createUserContractByUser(
      userContract
    );
  }

  async deleteUserContractById(id) {
    return await this.userContractRepository.deleteUserContractById(id);
  }
}

export default UserContractService;
