import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findByID(id: string): Promise<Product> {
        return this.productRepository.findOne(id);
    }

    async create(product: CreateProductDto): Promise<Product> {
        return this.productRepository.save(product);
    }

    async update(id: string, product: UpdateProductDto): Promise<any> {
        return this.productRepository.update(id, product);
    }

    async delete(id: string): Promise<any> {
        return this.productRepository.delete(id);
    }
}
