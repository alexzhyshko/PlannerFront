import { SectionDTO } from "./SectionDTO";
import { UserDTO } from "./UserDTO";

export interface CardDTO{
  id: string;
  title: string;
  description: string;
  bottomTitle: string;
  date: Date;
  time: Date;
  section: SectionDTO;
  workers: UserDTO[];
}
