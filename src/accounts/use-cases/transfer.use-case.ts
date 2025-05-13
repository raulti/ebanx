import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class TransferUseCase {
    constructor(private readonly accountsRepository: AccountRepository) { }

    async execute(origin: string, destination: string, amount: number) {

        if (amount <= 0) {
            throw new BadRequestException();
        }

        const originAccount = await this.accountsRepository.findById(origin);
        if (!originAccount) {
            throw new NotFoundException();
        }

        if (originAccount.balance < amount) {
            throw new BadRequestException();
        }

        let destinationAccount = await this.accountsRepository.findById(destination);

        originAccount.balance -= amount;

        if (!destinationAccount) {
            destinationAccount = { id: destination, balance: 0 };
        }
        destinationAccount.balance += amount;

        // TODO - Criar transaction
        await this.accountsRepository.save(originAccount);
        await this.accountsRepository.save(destinationAccount);

        return {
            origin: { id: originAccount.id, balance: originAccount.balance },
            destination: { id: destinationAccount.id, balance: destinationAccount.balance },
        };
    }
}