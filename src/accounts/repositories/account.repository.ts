import { Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountRepository {
    private accounts = new Map<string, Account>();

    async findById(id: string): Promise<Account | null> {
        const account = this.accounts.get(id);
        if (!account) {
            return null;
        }
        return account;
    }

    async save(account: Account): Promise<void> {
        this.accounts.set(account.id, account);
    }

    reset() {
        this.accounts.clear();
    }
}
