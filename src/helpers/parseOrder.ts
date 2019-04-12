interface OrderType {
  id: number;
  seats: { row: number; seat: number }[];
  createdAt?: Date;
  updatedAt?: Date;
  session: any;
  user: any;
  bonuses?: {
    id: number;
    title: string;
    price: number;
    'order-bonuses': {
      'order-id': 1;
      'bonus-id': 1;
      quantity: number;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
}

export default (order: OrderType) => ({
  id: order.id,
  user: order.user,
  session: order.session,
  seats: order.seats,
  bonuses: order.bonuses.map(bonus => ({
    id: bonus.id,
    title: bonus.title,
    price: bonus.price,
    quantity: bonus['order-bonuses'].quantity
  })),
  createdAt: order.createdAt,
  updatedAt: order.updatedAt
});
