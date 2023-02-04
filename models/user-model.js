const bcrypt = require("bcryptjs");

const db = require("../database/database");

class User {
  constructor(email, password, fullname, street, postalcode, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postalcode: postalcode,
      city: city,
    };
  }
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 14);
    await db.getdb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullname: this.fullname,
      address: this.address,
    });
  }
  async getUserWithSameEmail() {
    return await db.getdb().collection("users").findOne({ email: this.email });
  }
  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }
  async comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}
module.exports = User;
