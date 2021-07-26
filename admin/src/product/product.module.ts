import { Product } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        ClientsModule.register([
            {
                name: 'PRODUCT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://vjpdokxl:PfRJEhdRHmckX9E9uMTXTu_Oor1R4VOS@beaver.rmq.cloudamqp.com/vjpdokxl'],
                    queue: 'main_queue',
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
