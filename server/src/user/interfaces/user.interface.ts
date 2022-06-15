export interface IUser extends Document {
  readonly userName: string;
  readonly email: string;
  readonly verified: boolean;
  readonly expireAt: string;
}
