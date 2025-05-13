import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { Account } from '../entities/account.entity';
import { TransferMapper } from '../mappers/transfer.mapper';
import { TransferResponse } from '../dto/transfer.respose';

@Injectable()
export class TransferUseCase {
    constructor(private readonly accountsRepository: AccountRepository) { }

    async execute(origin: string, destination: string, amount: number): Promise<TransferResponse> {
        const originAccount = await this.getAccountOrThrow(origin);
        const destinationAccount = await this.getOrCreateAccount(destination);

        originAccount.decreaseBalance(amount);
        destinationAccount.increaseBalance(amount);

        await this.saveAccounts(originAccount, destinationAccount);

        return TransferMapper.toTransferResponse(originAccount, destinationAccount);
    }

    private async getAccountOrThrow(accountId: string): Promise<Account> {
        const account = await this.accountsRepository.findById(accountId);
        if (!account) {
            throw new NotFoundException();
        }
        return account;
    }

    private async getOrCreateAccount(accountId: string): Promise<Account> {
        let account = await this.accountsRepository.findById(accountId);
        if (!account) {
            account = new Account(accountId);
        }
        return account;
    }

    private async saveAccounts(originAccount: Account, destinationAccount: Account) {
        await this.accountsRepository.save(originAccount);
        await this.accountsRepository.save(destinationAccount);
    }
}