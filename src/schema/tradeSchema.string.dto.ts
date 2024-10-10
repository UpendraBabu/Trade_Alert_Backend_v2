import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TradeDataStringDocument = TradeDataString & Document;

@Schema({ timestamps: true })
export class TradeDataString {
  @Prop()
  id: number;
  @Prop({ required: true })
  data: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const TradeDataStringSchema =
  SchemaFactory.createForClass(TradeDataString);
