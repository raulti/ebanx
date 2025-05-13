import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum EventType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
}

export class EventRequest {
    @IsNumber()
    amount: number;

    @IsEnum(EventType)
    type: EventType;

    @IsString()
    origin?: string;

    @IsString()
    destination?: string;
}
