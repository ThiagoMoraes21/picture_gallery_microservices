import { Product } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController]
})
export class ProductModule { }
