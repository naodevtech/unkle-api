class OptionEntity {
  constructor({ id, icon, reference, name, description, status }) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.description = description;
  }
  validate() {
    if (!this.name || !this.description) {
      return false;
    } else {
      return true;
    }
  }
}

export default OptionEntity;
