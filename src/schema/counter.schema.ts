import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema({ timestamps: true })
export class Counter {
  @Prop()
  db: string;

  @Prop()
  id: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
