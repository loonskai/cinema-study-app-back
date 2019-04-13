import { HallType } from './hall';

export interface CinemaType {
  id?: number;
  title: string;
  city: string;
  halls?: HallType[];
  createdAt?: Date;
  updatedAt?: Date;
}
