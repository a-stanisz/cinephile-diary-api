class User {
  constructor(_id, name, role) {
    this.data = { _id, name, role }
  }
  get role() {
    return this.data.role;
  }

}