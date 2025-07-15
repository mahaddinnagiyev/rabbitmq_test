import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(userId: string, data: CreateProductDTO) {
    const { name, price } = data;

    const newProduct = this.productRepository.create({
      userId,
      name,
      price,
    });

    const savedProduct = await this.productRepository.save(newProduct);

    return savedProduct;
  }

  async getUserProducts(userId: string) {
    const products = await this.productRepository.find({ where: { userId } });

    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    return product;
  }

  async updateProduct(id: string, userId: string, data: UpdateProductDTO) {
    const isProductExist = await this.getProductById(id);

    if (!isProductExist) return { error: 'Product Not Found' };

    if (isProductExist.userId !== userId)
      return { error: 'You can not update this product' };

    await this.productRepository.update({ id: id }, { ...data });

    return { success: true };
  }

  async removeProduct(id: string, userId: string) {
    const isProductExist = await this.getProductById(id);

    if (!isProductExist) return { error: 'Product Not Found' };

    if (isProductExist.userId !== userId)
      return { error: 'You can not update this product' };

    await this.productRepository.delete({ id });

    return { success: true };
  }
}
