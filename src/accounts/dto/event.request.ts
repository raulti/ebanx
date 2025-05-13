import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateIf } from 'class-validator';

export enum EventType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
}

export class EventRequest {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsEnum(EventType)
    @IsNotEmpty()
    type: EventType;

    @ValidateIf((o) => !o.destination)
    @IsString()
    origin?: string;

    @ValidateIf((o) => !o.origin)
    @IsString()
    destination?: string;
}
