import { CardDTO } from "./CardDTO";
import { NotificationDTO} from "./NotificationDTO";
import { DashboardDTO } from "./DashboardDTO";

export interface UserDTO{
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  dashboards: DashboardDTO[];
  cards: CardDTO[];
  notifications: NotificationDTO[];
}
