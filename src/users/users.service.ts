import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { execScan,execSaveItem,execGetOneItem } from '../utils/dynamoDB';
import {PutCommandInput} from '@aws-sdk/lib-dynamodb';
import {Response} from 'express';

@Injectable()
export class UsersService {
  private TableName = 'userDevelopment'

  async create(createUserDto: CreateUserDto,@Res() res: Response) {
    console.log(createUserDto)
    const params: PutCommandInput = {
      TableName: this.TableName,
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
      TableName: this.TableName
    }
    const response = await execScan<CreateUserDto>(params)
    if (response.success) {
      return res.status(HttpStatus.OK).json(response.data);
    }
    if (response.success === false) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.message)
    }
  }

  async findOne(id: string, @Res() res:Response) {
    const params ={
      TableName: this.TableName ,
      Key: {
        id
      }
    }
    const response = await execGetOneItem<CreateUserDto>(params)
    if (response.success) {
      return res.status(HttpStatus.OK).json(response.data);
    }
    if (response.success === false) {
      return res.status(HttpStatus.NOT_FOUND).json(response.message)
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
