class SubscribtionOptionEntity {
  constructor({ id, subscribtionId, contractOptionId }) {
    this.id = id;
    this.subscribtionId = subscribtionId;
    this.contractOptionId = contractOptionId;
  }
  validate() {
    if (!this.subscribtionId || !this.contractOptionId) {
      return false;
    } else {
      return true;
    }
  }
}

export default SubscribtionOptionEntity;
