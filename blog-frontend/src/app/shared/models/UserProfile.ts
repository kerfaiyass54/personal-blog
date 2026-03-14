import {Interest} from "./Interest";
import {Nationality} from "./Nationality";

export interface UserProfile {
  firstName: string;
  lastName: string;
  job: string;
  birthDate: Date;
  nationality: Nationality;
  city: string;
  interests: Interest[];
  avatarInitials: string;
}
