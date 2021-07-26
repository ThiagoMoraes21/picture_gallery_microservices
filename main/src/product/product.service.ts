import { Product, ProductDocument } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        private httpService: HttpService
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

    async update(id: number, product: UpdateProductDto): Promise<any> {
        return this.productModel.updateOne(
            { id: id },
            product
        );
    }

    async remove(id: string): Promise<any> {
        return this.productModel.deleteOne({ _id: id });
    }

    like(id: string): Observable<any> {
        const baseUrl = `http://localhost:8000/api/products/${id}/like`;
        return this.httpService.post(baseUrl, {});
    }
}
