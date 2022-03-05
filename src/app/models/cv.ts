import {Job} from "./job";

export class Cv {
  'name': string;
  'lastName'?:string;
  'bDay'?:Date;
  'phoneNumber'?: string;
  'email'?: string;
  'skills'?: string[];
  'job'?: Job[]
}
