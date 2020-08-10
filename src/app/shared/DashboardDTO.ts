import { UserDTO } from "./UserDTO";
import { SectionDTO } from "./SectionDTO";

export interface DashboardDTO{
  id: string;
  title: string;
  sections: SectionDTO[];
  users: UserDTO[];
}
