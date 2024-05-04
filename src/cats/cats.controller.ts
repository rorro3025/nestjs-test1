import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Post,
  Param,
  Req,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cat as CreateCat } from './create-cat.dto';

interface Cat {
  name: string;
  age: number;
}

let db: Cat[] = [
  { name: 'cat1', age: 21 },
  { name: 'cat3', age: 12 },
];

@Controller('cats')
export class CatsController {

  @Get()
  findAll(@Req() request: Request, @Res() res): Cat[] {
    return res.status(HttpStatus.ACCEPTED).json(db);
  }

  @Post()
  saveOne(@Body() createCat: CreateCat, @Res() res: Response) {
    db.push(createCat);
    return res.status(HttpStatus.CREATED);
  }

  @Get(':id')
  getOne(@Param('id') params: string): Cat | string {
    console.log(params);
    if (db[Number(params)]) return db[Number(params)];
    return 'Not  found';
  }

  @Patch(':id')
  updateOne(@Param('id') params: string, @Body() data: { name: string }) {
    try {
      const index = Number(params);
      if (!db[index]) return 'Not found';
      console.log(db[index]);
      console.log('data', data);
      db[index] = { ...db[index], name: data.name };
      return db[index];
    } catch (error) {
      return 'Not valid value';
    }
  }

  @Delete(':id')
  deleteOne(@Param('id') params: string) {
    const index = Number(params);
    if (!db[index]) return 'this element does not exist';
    delete db[index];
    const temp = db.filter((i) => !!i);
    db = [...temp];
    return 'Element deleted';
  }
}
