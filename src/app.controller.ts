import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() body): string {
    console.log('request come');
    return this.appService.getHello();
  }
}
