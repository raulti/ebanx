import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class WithdrawUseCase {
    constructor(private readonly accountsRepository: AccountRepository) { }

    async execute(origin: string, amount: number) {
        if (amount <= 0) {
            throw new BadRequestException();
        }

        const account = await this.accountsRepository.findById(origin);
        if (!account) {
            throw new NotFoundException();
        }

        if (account.balance < amount) {
            throw new BadRequestException();
        }

        account.balance -= amount;
        await this.accountsRepository.save(account);

        return {
            origin: {
                id: account.id,
                balance: account.balance,
            },
        };
    }
}