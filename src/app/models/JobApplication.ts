export class JobApplication {
  id!: number;
  firstName!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  constructor(init?: Partial<JobApplication>) {
    Object.assign(this, init);
  }
}
