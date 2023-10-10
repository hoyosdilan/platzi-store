import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const { data } = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos').pipe(
            catchError((error: AxiosError) => {
              console.log(`error getting in UseFactory error: ${error}`);
              throw 'An error happened!';
            }),
          ),
        );
        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
