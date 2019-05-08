import { Deserializable } from "../interfaces/deserializable.interface";

export class Staff implements Deserializable {
  id: string;
  firstname: string;
  lastname: string;
  birth: Date;
  gender: string;
  email: string;
  status: string;
  role: string;
  createdAt: Date;
  avatar: object;
  roleInTour: any;
  info: object;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
