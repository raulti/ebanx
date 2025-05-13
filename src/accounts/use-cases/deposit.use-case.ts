import { AccountRepository } from "../repositories/account.repository";

export class DepositUseCase {
    constructor(private repository: AccountRepository) { }

    async execute(destination: string, amount: number) {
        let account = await this.repository.findById(destination);

        if (!account) {
            account = { id: destination, balance: 0 };
        }

        account.balance += amount;
        await this.repository.save(account);
        return { destination: account };
    }
}