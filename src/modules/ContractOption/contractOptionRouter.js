class ContractOptionRouter {
  constructor({ router, upload, auth, contractOptionController }) {
    this.router = router;
    this.upload = upload;
    this.initializeRoutes({ contractOptionController, auth });
    return this.router;
  }

  initializeRoutes({ contractOptionController, auth }) {
    this.router
      .route('/contractOptions/:id')
      .get(contractOptionController.getAllContractOptionsByContract);
    this.router
      .route('/contractOptions')
      .post(contractOptionController.createContractOptionByContract);
    this.router
      .route('/contractOptions/:id')
      .delete(contractOptionController.deleteContractOptionById);
  }
}
export default ContractOptionRouter;
