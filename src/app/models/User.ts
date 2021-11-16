export class User {
  username!: string;
  token!: string;
  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
