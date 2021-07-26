import { Controller, Get, Post, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Get('/findById/:id')
    findById(@Param('id') id: string) {
        return this.productService.findByID(id);
    }

    @Post(':id/like')
    async like(@Param('id') id: string) {
        const product = await this.productService.findOne(+id);

        this.productService.like(id).subscribe(
            res => console.log('product liked')
        );

        return this.productService.update(+id, { 
            likes: product.likes + 1
        });
    }

    @EventPattern('product_created')
    async create(product: CreateProductDto) {
        await this.productService.create(product);
    }

    @EventPattern('product_updated')
    async update(product: UpdateProductDto) {
        await this.productService.update(+product.id, product);
    }

    @EventPattern('product_deleted')
    async delete(id: string) {
        const product = await this.productService.findOne(+id);
        await this.productService.remove(product._id);
    }
}
