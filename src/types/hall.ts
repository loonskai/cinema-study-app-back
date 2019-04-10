export interface HallType {
  id?: number;
  title: string;
  'cinema-id': number;
  rows: RowType[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RowType {
  'category-id': number;
  category: number;
  price: number;
  seats: number;
  reserved: number[];
  ordered: number[];
  lastInSection: boolean;
}

export interface RowCategoryType {
  id?: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
