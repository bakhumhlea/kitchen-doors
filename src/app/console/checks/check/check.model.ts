import { Item } from './item.model';

export interface Check {
  id: string;
  title: string;
  items: Item[];
  guest: number | 0;
  host: string;
  create_at: Date;
  saved: boolean;
  adjusted_tip: boolean;
}