import { Item } from './item.model';

export interface Check {
  id?: string;
  title: string;
  items: Item[];
  guest: number;
  host: string;
  create_at: Date;
  closed: boolean;
  adjusted_tips: boolean;
  purchase_value: number;
  tips?: number;
  payment?: 'credit' | 'cash' | 'mobile';
}