import container from './container';

const server = container.resolve('server');
const config = container.resolve('config');

server.listen(config.server_port);
