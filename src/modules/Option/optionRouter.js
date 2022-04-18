class OptionRouter {
  constructor({ router, upload, auth, optionController }) {
    this.router = router;
    this.upload = upload;
    this.initializeRoutes({ optionController, auth });
    return this.router;
  }

  initializeRoutes({ optionController, auth }) {
    this.router.route('/options').get(optionController.getAllOptions);
    this.router.route('/options/:id').get(optionController.getOption);
    this.router.route('/options').post(optionController.createOption);
    this.router.route('/options/:id').delete(optionController.deleteOption);
    this.router.route('/options/:id').patch(optionController.updateOption);
  }
}
export default OptionRouter;
