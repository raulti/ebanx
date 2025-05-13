import { AccountRepository } from "../repositories/account.repository";
import { Account } from "../entities/account.entity";
import { DepositResponse } from "../dto/deposit.response";

export class DepositUseCase {
    constructor(private accountRepository: AccountRepository) { }

    async execute(accountId: string, amount: number): Promise<DepositResponse> {
        let account = await this.accountRepository.findById(accountId);

        if (!account) {
            account = new Account(accountId);
        }

        account.increaseBalance(amount);
        await this.accountRepository.save(account);
        return { destination: account };
    }
}