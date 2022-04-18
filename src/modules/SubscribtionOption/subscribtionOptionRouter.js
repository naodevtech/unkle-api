class SubscribtionOptionRouter {
  constructor({ router, subscribtionOptionController, auth }) {
    this.router = router;
    this.initializeRoutes({ subscribtionOptionController, auth });
    return this.router;
  }

  initializeRoutes({ subscribtionOptionController, auth }) {
    this.router
      .route('/subscribtionOptions/:id')
      .get(
        subscribtionOptionController.getAllSubscribtionOptionsBySubscribtion
      );
    this.router
      .route('/subscribtionOptions')
      .post(subscribtionOptionController.createSubscribtionOption);
  }
}
export default SubscribtionOptionRouter;
