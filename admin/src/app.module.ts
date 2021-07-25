import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.HOST,
            port: Number(process.env.PORT),
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            autoLoadEntities: true, 
            synchronize: true,
        }),
        ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
