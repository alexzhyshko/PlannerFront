import { UserDTO } from "./UserDTO";

export interface NotificationDTO{
  id: string;
  title: string;
  text: string;
  isSeen: boolean;
  owner: UserDTO;
}
