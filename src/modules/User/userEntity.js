class UserEntity {
  constructor({ id, role, avatar, lastname, firstname, email, password }) {
    this.id = id;
    this.role = role;
    this.avatar = avatar;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
  }
  validate() {
    if (!this.avatar || !this.lastname || !this.firstname || !this.email) {
      return false;
    } else {
      return true;
    }
  }

  checkRole() {
    if (this.role === 'admin' || this.role === 'client') {
      return true;
    } else {
      return false;
    }
  }

  checkEmail() {
    const emailRegexp =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegexp.test(this.email)) {
      return false;
    } else {
      return true;
    }
  }

  checkPassword() {
    const passwordRegexp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!passwordRegexp.test(this.password)) {
      return false;
    } else {
      return true;
    }
  }
}

export default UserEntity;
