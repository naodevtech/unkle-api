class ContractOptionEntity {
  constructor({ id, contractId, optionId }) {
    this.id = id;
    this.contractId = contractId;
    this.optionId = optionId;
  }
  validate() {
    if (!this.contractId || !this.optionId) {
      return false;
    } else {
      return true;
    }
  }
}

export default ContractOptionEntity;
