class ContractRouter {
  constructor({ router, upload, auth, contractController }) {
    this.router = router;
    this.upload = upload;
    this.initializeRoutes({ contractController, auth });
    return this.router;
  }

  initializeRoutes({ contractController, auth }) {
    this.router.route('/contracts').get(contractController.getAllContracts);
    this.router.route('/contracts/:id').get(contractController.getContract);
    this.router
      .route('/contracts')
      .post(this.upload.single('icon'), contractController.createContract);
    this.router
      .route('/contracts/:id')
      .delete(contractController.deleteContract);
    this.router.route('/contracts/:id').get(contractController.getContract);
  }
}
export default ContractRouter;
