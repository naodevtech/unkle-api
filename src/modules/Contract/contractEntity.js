class ContractEntity {
  constructor({ id, icon, reference, name, description, status }) {
    this.id = id;
    this.icon = icon;
    this.reference = reference;
    this.name = name;
    this.description = description;
    this.status = status;
  }
  validate() {
    if (
      !this.icon ||
      !this.reference ||
      !this.name ||
      !this.description ||
      !this.status
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkStatus() {
    if (this.status === 'available' || this.status === 'disabled') {
      return true;
    } else {
      return false;
    }
  }
}

export default ContractEntity;
