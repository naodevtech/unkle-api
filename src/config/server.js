class Server {
  constructor({ express, cors, routes, cookieParser, handleError }) {
    this.app = express();
    this.initializeBodyParsing(express);
    this.initializeApplicationCors(cors);
    this.initializeMiddlewares({ cookieParser });
    this.initializeApplicationRouter(routes);
    this.app.use((err, request, response, next) => {
      handleError(err, response);
    });
  }

  initializeBodyParsing(express) {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  initializeApplicationCors(cors) {
    this.app.use(
      cors({
        credentials: true,
        origin: [
          'http://localhost:3000',
          'http://unkle-front.herokuapp.com',
          'https://unkle-front.herokuapp.com'
        ]
      })
    );
  }

  initializeMiddlewares({ cookieParser }) {
    this.app.use(cookieParser());
  }

  initializeApplicationRouter(routes) {
    this.app.use(routes);
  }

  listen(port) {
    this.app.listen(port || process.env.PORT, '0.0.0.0', () =>
      port
        ? console.log(
            ` 🚀 L'API a démarrée sur le port : ${port || process.env.PORT} 💥`
          )
        : console.log("🚀 L'API a démarrée sur Heroku 🟣💥")
    );
  }
}

export default Server;
