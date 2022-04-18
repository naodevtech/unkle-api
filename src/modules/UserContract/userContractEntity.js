class UserContractEntity {
  constructor({ id, contractId, userId }) {
    this.id = id;
    this.contractId = contractId;
    this.userId = userId;
  }
  validate() {
    if (!this.contractId || !this.userId) {
      return false;
    } else {
      return true;
    }
  }
}

export default UserContractEntity;
