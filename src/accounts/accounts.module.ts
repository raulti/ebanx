import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TransferUseCase } from './use-cases/transfer.use-case';
import { WithdrawUseCase } from './use-cases/withdraw.use-case';
import { AccountRepository } from './repositories/account.repository';
import { BalanceUseCase } from './use-cases/balance.use-case';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, TransferUseCase, WithdrawUseCase, BalanceUseCase, AccountRepository],
  exports: [TransferUseCase, WithdrawUseCase, BalanceUseCase],
})
export class AccountsModule { }
