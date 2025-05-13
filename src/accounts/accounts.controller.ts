import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { EventRequest } from './dto/event.request';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post('reset')
  reset() {
    this.accountsService.reset();
    return {};
  }

  @Get('balance')
  getBalance(@Query('account_id') accountId: string) {
    const balance = this.accountsService.getBalance(accountId);
    return balance;
  }

  @Post('event')
  handleEvent(@Body() dto: EventRequest) {
    const result = this.accountsService.handleEvent(dto);
    return result;
  }
}
