import { Controller, Post, Get, Query, Body, HttpCode } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { EventRequest } from './dto/event.request';

@Controller('')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post('reset')
  @HttpCode(200)
  reset() {
    this.accountsService.reset();
    return 'OK';
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
