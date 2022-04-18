import OptionEntity from './optionEntity';

class OptionService {
  constructor({ optionRepository, ApiError }) {
    this.optionRepository = optionRepository;
    this.apiError = ApiError;
  }

  async getAllOptions() {
    return await this.optionRepository.getAllOptions();
  }

  async createOption(option) {
    const optionEntity = new OptionEntity(option);
    if (!optionEntity.validate()) {
      throw new this.apiError(400, 'Il y a des champs manquant ❌');
    }
    return await this.optionRepository.createOption(option);
  }

  async getOption(id) {
    return await this.optionRepository.getOptionById(id);
  }

  async deleteOption(id) {
    return await this.optionRepository.deleteOptionById(id);
  }

  async updateOption(id, option) {
    return await this.optionRepository.updateOptionById(id, option);
  }
}

export default OptionService;
