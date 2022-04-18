class OptionRepository {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  async getAllOptions() {
    const options = await this.db.Option.findAll();
    if (!options) {
      throw new this.apiError(400, "Il semble qu'il n'y ai aucunes options 😖");
    }
    return options;
  }

  async createOption(option) {
    const optionIsExist = await this.db.Option.findOne({
      where: { name: option.name }
    });
    if (optionIsExist) {
      throw new this.apiError(
        400,
        "Il semble qu'il existe deja une option portant le même nom 😖"
      );
    }
    return await this.db.Option.create(option);
  }

  async getOptionById(id) {
    const option = await this.db.Option.findOne({
      where: { id: id }
    });
    if (!option) {
      throw new this.apiError(
        400,
        "Il semble qu'il n'y ai aucune option à cet ID 😖"
      );
    }
    return option;
  }

  async deleteOptionById(id) {
    const optionIsExist = await this.db.Option.findOne({
      where: { id: id }
    });
    if (!optionIsExist) {
      throw new this.apiError(
        400,
        "Il semble que l'option que vous voulez supprimer n'existe pas/plus 😖"
      );
    }
    return await this.db.Option.destroy({ where: { id: id } });
  }

  async updateOptionById(id, option) {
    const optionIsExist = await this.db.Option.findOne({
      where: { id: id }
    });
    if (!optionIsExist) {
      throw new this.apiError(
        400,
        "Il semble que l'option que vous voulez modifier n'existe pas/plus 😖"
      );
    }
    return await this.db.Option.update({ option }, { where: { id: id } });
  }
}
export default OptionRepository;
