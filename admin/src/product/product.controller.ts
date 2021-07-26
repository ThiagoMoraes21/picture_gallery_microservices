import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findByID(@Param('id') id: string) {
        return this.productService.findByID(+id);
    }

    @Post()
    async create(@Body() product: CreateProductDto) {
        const createdProduct = await this.productService.create(product);
        this.client.emit('product_created', createdProduct);
        return createdProduct;
    }

    @Patch(':id') 
    async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
        await this.productService.update(+id, product);
        const updatedProduct = await this.productService.findByID(+id);
        this.client.emit('product_updated', updatedProduct);
        return updatedProduct;
    }   

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.productService.delete(+id);
        this.client.emit('product_deleted', id);
    }

    @Post(':id/like')
    async like(@Param('id') id: string) {
        const product = await this.productService.findByID(+id);
        return this.productService.update(+id, {
            likes: product.likes + 1
        });
    }
}
