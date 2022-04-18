class UserContractRouter {
  constructor({ router, userContractController, auth }) {
    this.router = router;
    this.initializeRoutes({ userContractController, auth });
    return this.router;
  }

  initializeRoutes({ userContractController, auth }) {
    this.router
      .route('/userContracts/:id')
      .get(userContractController.getAllUserContractsByUser);
    this.router
      .route('/userContracts')
      .post(userContractController.createUserContractByUser);
    this.router
      .route('/userContracts/:id')
      .delete(userContractController.deleteUserContractById);
  }
}
export default UserContractRouter;
