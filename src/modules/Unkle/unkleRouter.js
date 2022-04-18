class UnkleRouter {
  constructor({ router }) {
    this.router = router;
    this.initializeRoutes();
    return this.router;
  }
  initializeRoutes() {
    this.router.route('/').get(async (request, response) => {
      response.status(200).json({
        Application: 'Unkle-API',
        Description:
          "Bienvenue dans l'api Unkle qui permets de faciliter la souscription aux contrats d'assurances! 🔵"
      });
    });
  }
}

export default UnkleRouter;
