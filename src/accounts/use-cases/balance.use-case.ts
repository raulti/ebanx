import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { Account } from '../entities/account.entity';

@Injectable()
export class BalanceUseCase {
    constructor(private readonly accountsRepository: AccountRepository) { }

    async execute(accountId: string): Promise<Account> {
        const account = await this.accountsRepository.findById(accountId);
        if (!account) {
            throw new NotFoundException();
        }
        return account;
    }
}