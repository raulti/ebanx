import { TransferResponse } from '../dto/transfer.respose';
import { Account } from '../entities/account.entity';

export class TransferMapper {
    static toTransferResponse(originAccount: Account, destinationAccount: Account): TransferResponse {
        return {
            origin: {
                id: originAccount.id,
                balance: originAccount.balance,
            },
            destination: {
                id: destinationAccount.id,
                balance: destinationAccount.balance,
            },
        };
    }
}