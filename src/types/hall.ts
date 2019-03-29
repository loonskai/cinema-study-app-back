export interface HallType {
  id?: number;
  title: string;
  'cinema-id': number;
  rows: RowType[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RowType {
  categoryID: number;
  price: number;
  seats: number;
  reserved: number[];
  ordered: number[];
  lastInSection: boolean;
}
