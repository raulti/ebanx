import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export enum EventType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
}

export class EventRequest {
    @IsNumber()
    @IsNotEmpty()
    @MaxLength(12)
    amount: number;

    @IsEnum(EventType)
    @IsNotEmpty()
    type: EventType;

    @ValidateIf((o) => !o.destination)
    @IsString()
    @MaxLength(15)
    origin?: string;

    @ValidateIf((o) => !o.origin)
    @IsString()
    @MaxLength(15)
    destination?: string;
}
