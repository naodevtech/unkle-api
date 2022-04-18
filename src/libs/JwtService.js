class JwtService {
  constructor(jwt, secret) {
    this.jwt = jwt;
    this.secret = secret;
  }

  async decodeToken(token) {
    return await this.jwt.verify(token, this.secret);
  }

  async generateToken(data) {
    return await this.jwt.sign(data, this.secret);
  }
}
export default JwtService;
