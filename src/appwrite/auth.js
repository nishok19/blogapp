import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  session;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("useracc", userAccount);
      if (userAccount) {
        return this.login(email, password);
      } else {
        throw Error;
      }
    } catch (err) {
      console.log("Creation of account failed in createAccount-auth.js, ", err);
      throw Error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      console.log("Login failed in login-auth.js, ", err);
      throw Error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log(
        "Getting current user failed in getCurrentUser-auth.js, ",
        err
      );
      throw Error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.log("Logout user failed in logout-auth.js, ", err);
      throw Error;
    }
  }
}

const authService = new AuthService();

export default authService;
