import { Product, ProductDocument } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {}

    async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async findAll(): Promise<ProductDocument[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: number): Promise<ProductDocument> {
        return this.productModel.findOne({ id });
    }

    async findByID(id: string): Promise<ProductDocument> {
        return this.productModel.findById(id);
    }

    async update(id: number, product: UpdateProductDto) {
        return this.productModel.findOneAndUpdate(
            { id }, product
        );
    }

    async remove(id: string): Promise<any> {
        return this.productModel.deleteOne({ _id: id });
    }
}
