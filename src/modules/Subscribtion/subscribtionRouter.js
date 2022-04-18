class SubscribtionRouter {
  constructor({ router, auth, subscribtionController }) {
    this.router = router;
    this.initializeRoutes({ subscribtionController, auth });
    return this.router;
  }

  initializeRoutes({ subscribtionController, auth }) {
    this.router
      .route('/subscribtions/:id')
      .get(subscribtionController.getAllSubscribtionsByUser);
    this.router
      .route('/subscribtions/:id')
      .get(subscribtionController.getAllSubscribtionsByContract);
    this.router
      .route('/subscribtions')
      .post(subscribtionController.createSubscribtion);
    this.router
      .route('/subscribtions/:id')
      .patch(subscribtionController.updateSubscribtionById);
  }
}
export default SubscribtionRouter;
