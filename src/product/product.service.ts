import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id_product: string): Promise<Product> {
    const product = await this.productModel.findById(id_product);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO);
    await product.save();
    return product;
  }

  async deleteProduct(id_product: string): Promise<any> {
    const product = await this.productModel.findByIdAndDelete(id_product);
    return product;
  }

  async updateProduct(id_product: string, createProductDTO: CreateProductDTO) {
    const product = await this.productModel.findByIdAndUpdate(
      id_product,
      createProductDTO,
      { new: true },
    );
    return product;
  }
}
