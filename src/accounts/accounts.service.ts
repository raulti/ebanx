import { Injectable } from '@nestjs/common';
import { DepositUseCase } from './use-cases/deposit.use-case';
import { EventRequest, EventType } from './dto/event.request';
import { WithdrawUseCase } from './use-cases/withdraw.use-case';
import { TransferUseCase } from './use-cases/transfer.use-case';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountsService {
  constructor(
    private repository: AccountRepository
  ) { }

  reset() {
    this.repository.reset();
  }

  async getBalance(accountId: string) {
    const account = await this.repository.findById(accountId);
    return account?.balance ?? null;
  }

  handleEvent(dto: EventRequest) {
    switch (dto.type) {
      case EventType.WITHDRAW:
        return new WithdrawUseCase(this.repository).execute(dto.origin!, dto.amount);
      case EventType.DEPOSIT:
        return new DepositUseCase(this.repository).execute(dto.destination!, dto.amount);
      case EventType.TRANSFER:
        return new TransferUseCase(this.repository).execute(dto.origin!, dto.destination!, dto.amount);
    }
  }
}