import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findByID(@Param('id') id: string) {
        return this.productService.findByID(id);
    }

    @Post()
    async create(@Body() product: CreateProductDto) {
        return this.productService.create(product);
    }

    @Patch(':id') 
    async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
        return this.productService.update(id, product);
    }   

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }
}
