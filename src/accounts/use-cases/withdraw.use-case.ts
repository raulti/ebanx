import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { WithdrawMapper } from '../mappers/withdraw.mapper';

@Injectable()
export class WithdrawUseCase {
    constructor(private readonly accountsRepository: AccountRepository) { }

    async execute(accountId: string, amount: number) {
        const account = await this.accountsRepository.findById(accountId);
        if (!account) {
            throw new NotFoundException();
        }

        account.decreaseBalance(amount);
        await this.accountsRepository.save(account);

        return WithdrawMapper.toWithdrawResponse(account);
    }
}