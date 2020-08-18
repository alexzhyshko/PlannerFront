import { UserDTO } from "./UserDTO";

export interface NotificationDTO{
  id: string;
  title: string;
  text: string;
  seen: boolean;
  owner: UserDTO;
  created: Date;
}
