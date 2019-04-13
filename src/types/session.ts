export interface SeatItem {
  row: number;
  seat: number;
  userID: number;
}

export interface SessionType {
  id?: number;
  date: Date;
  time: string;
  'movie-id': number;
  'hall-id': number;
  reserved: string[] | SeatItem[];
  ordered: string[] | SeatItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
