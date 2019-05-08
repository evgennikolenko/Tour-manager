import { Deserializable } from "../interfaces/deserializable.interface";
import { Staff } from "./staff.model";
import { User } from "./user.model";
import { Place } from "./place.model";

export class Tour implements Deserializable {
  id: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  name: string;
  descrption: string;
  state: string;
  generateDocFile: boolean;
  logo: string;
  // documents: object;
  places: Place[];
  staff: Staff[];

  deserialize(input: any) {
    Object.assign(this, input);

    this.places = input.places.map((place) => new Place().deserialize(place));
    this.staff = input.staff.map((staff) => new Staff().deserialize(staff));
    return this;
  }
}
