class UserRouter {
  constructor({ router, userController }) {
    this.router = router;
    this.initializeRoutes({ userController });
    return this.router;
  }

  initializeRoutes({ userController }) {
    this.router.route('/register').post(userController.register);
    this.router.route('/login').post(userController.login);
    this.router.route('/logout').post(userController.logout);
    this.router.route('/me').get(userController.me);
    this.router.route('/users/:id').patch(userController.updateUser);
    this.router.route('/users/:id').delete(userController.deleteUser);
    this.router.route('/users').get(userController.getAllUsers);
    this.router.route('/users/:id').get(userController.getUserById);
  }
}
export default UserRouter;
