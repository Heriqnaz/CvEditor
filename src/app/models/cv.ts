import {Job} from "./job";
import {Skill} from "./skill";

export class Cv {
  '_id': string
  'name': string;
  'lastName'?:string;
  'bDay'?:Date;
  'phoneNumber'?: string;
  'email'?: string;
  'skills'?: Skill[];
  'jobs'?: Job[]
}
