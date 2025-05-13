import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositUseCase } from './use-cases/deposit.use-case';
import { EventRequest, EventType } from './dto/event.request';
import { WithdrawUseCase } from './use-cases/withdraw.use-case';
import { TransferUseCase } from './use-cases/transfer.use-case';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountsService {
  constructor(
    private accountRepository: AccountRepository
  ) { }

  reset() {
    this.accountRepository.reset();
  }

  async getBalance(accountId: string) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException();
    }
    return account.balance;
  }

  handleEvent(dto: EventRequest) {
    switch (dto.type) {
      case EventType.WITHDRAW:
        return new WithdrawUseCase(this.accountRepository).execute(dto.origin!, dto.amount);
      case EventType.DEPOSIT:
        return new DepositUseCase(this.accountRepository).execute(dto.destination!, dto.amount);
      case EventType.TRANSFER:
        return new TransferUseCase(this.accountRepository).execute(dto.origin!, dto.destination!, dto.amount);
    }
  }
}