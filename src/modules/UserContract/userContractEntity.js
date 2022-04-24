class UserContractEntity {
  constructor({ id, contractId, userId, beginingDate, endDate }) {
    this.id = id;
    this.contractId = contractId;
    this.userId = userId;
    this.beginingDate = beginingDate;
    this.endDate = endDate;
  }
  validate() {
    if (
      !this.contractId ||
      !this.userId ||
      !this.beginingDate ||
      !this.endDate
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export default UserContractEntity;
