class SubscribtionEntity {
  constructor({
    id,
    status,
    beginingDate,
    endDate,
    cancelDate,
    userId,
    contractId
  }) {
    this.id = id;
    this.status = status;
    this.beginingDate = beginingDate;
    this.endDate = endDate;
    this.cancelDate = cancelDate;
    this.userId = userId;
    this.contractId = contractId;
  }
  validate() {
    if (
      !this.status ||
      !this.beginingDate ||
      !this.endDate ||
      !this.userId ||
      this.contractId
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkStatus() {
    if (
      this.status === 'pending' ||
      this.status === 'active' ||
      this.status === 'resilied' ||
      this.status === 'finished'
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default SubscribtionEntity;
