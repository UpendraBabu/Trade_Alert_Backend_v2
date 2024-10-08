import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TradeDataDocument = TradeData & Document;

@Schema({ timestamps: true })
export class TradeData {
  @Prop({ required: true })
  uid: string;

  @Prop()
  orderid: number;

  @Prop()
  pair: string;

  @Prop()
  side: number;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  status: boolean;

  @Prop()
  neworders: any[];

  @Prop()
  childorders: any[];

  @Prop()
  rejectedorders: any[];

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const TradeDataSchema = SchemaFactory.createForClass(TradeData);
