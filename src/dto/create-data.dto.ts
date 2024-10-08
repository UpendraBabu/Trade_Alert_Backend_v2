export class CreateTradeDataDto {
  userId: number;
  orderid: number;
  pair: string;
  side: number;
  price: number;
  quantity: number;
  status: boolean;
  neworders: any[];
  childorders: any[];
  rejectedorders: any[];
  createdAt: string;
  updatedAt: string;
}
