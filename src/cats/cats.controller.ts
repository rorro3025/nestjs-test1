import { Controller, Get, Post, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express';

const db = ["cat1", "cat3"]

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string[] {
    console.log(request.url)
    return db
  }

  @Post()
  saveOne(@Body() data: { name: string }): string {
    db.push(data.name)
    return 'success'
  }

  @Get(":id")
  getOne(@Param('id') params: string): string {
    console.log(params)
    if (db[Number(params)]) return db[Number(params)]
    return "Not  found"
  }

}
