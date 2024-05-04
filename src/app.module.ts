import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [AuthModule, UsersModule, ExpensesModule],
  controllers: [ CatsController],
})
export class AppModule {}
