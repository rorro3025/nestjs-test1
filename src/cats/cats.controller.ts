import { Controller, Get, Post} from '@nestjs/common';

const db = ["cat1","cat3"]

@Controller('cats')
export class CatsController {
  @Get()
    findAll():string[]{
      return db
  }

  @Post()
    saveOne(){
      
  }
}
