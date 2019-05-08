import { Deserializable } from "../interfaces/deserializable.interface";

export class User implements Deserializable {
  id: string;
  name: object;
  birth: Date;
  gender: string;
  email: string;
  status: string;
  role: string;
  registrationDate: Date;
  avatar: object;
  company: object;
  job: object;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
