import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { execScan,execSaveItem } from '../utils/dynamoDB';
import {PutCommandInput} from '@aws-sdk/lib-dynamodb';
import {Response} from 'express';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto,@Res() res: Response) {
    console.log(createUserDto)
    const params: PutCommandInput = {
      TableName: 'userDevelopment',
      Item: createUserDto
    }
    const response = await execSaveItem<CreateUserDto>(params)
    if (response.success) {
      return res.status(HttpStatus.CREATED).json({message:`${response.data.username} has been created`});  
    }
    if (response.success === false) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.message)
    }
    return 'Error'
  }

  async findAll(@Res() res: Response) {
    console.log('sevice')
    const params = {
      TableName: 'userDevelopment'
    }
    const response = await execScan<CreateUserDto>(params)
    if (response.success) {
      return res.status(HttpStatus.OK).json(response.data);
    }
    if (response.success === false) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
