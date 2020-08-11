import { CardDTO } from "./CardDTO";
import { DashboardDTO } from "./DashboardDTO";

export interface SectionDTO{
  id: string;
  title: string;
  cards: CardDTO[];
  dashboard: DashboardDTO;
  deleteSectionFlag: boolean;
  cardCreate: boolean;
}
