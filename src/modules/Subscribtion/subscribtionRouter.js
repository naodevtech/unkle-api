class SubscribtionRouter {
  constructor({ router, auth, subscribtionController, subscribtion }) {
    this.router = router;
    this.initializeRoutes({ subscribtionController, auth, subscribtion });
    return this.router;
  }

  initializeRoutes({ subscribtionController, auth, subscribtion }) {
    this.router
      .route('/subscribtions/:id')
      .get(
        subscribtion.refreshStatus,
        subscribtionController.getAllSubscribtionsByUser
      );
    this.router
      .route('/subscribtions/:id')
      .get(subscribtionController.getAllSubscribtionsByContract);
    this.router
      .route('/subscribtions')
      .post(subscribtionController.createSubscribtion);
    this.router
      .route('/subscribtions/:id')
      .patch(subscribtionController.cancelSubscribtionById);
  }
}
export default SubscribtionRouter;
