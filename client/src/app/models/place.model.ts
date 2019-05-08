import { Deserializable } from "../interfaces/deserializable.interface";

export class Place implements Deserializable {
  country: string;
  countryCode: string;
  state: string;
  city: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
