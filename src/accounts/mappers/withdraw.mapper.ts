import { WithdrawResponse } from '../dto/withdraw-response';
import { Account } from '../entities/account.entity';

export class WithdrawMapper {
    static toWithdrawResponse(account: Account): WithdrawResponse {
        return {
            origin: {
                id: account.id,
                balance: account.balance,
            },
        };
    }
}