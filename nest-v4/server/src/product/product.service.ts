import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
  ) {}

  async addProduct(userId: string, product: CreateProductDTO) {
    return this.productService.send({ cmd: 'addProduct' }, { userId, product });
  }

  async getMyProducts(userId: string) {
    return this.productService.send({ cmd: 'getMyProducts' }, userId);
  }

  async getProductById(id: string) {
    return this.productService.send({ cmd: 'getProductById' }, id);
  }

  async updateProduct(userId: string, id: string, product: UpdateProductDTO) {
    return this.productService.send(
      { cmd: 'updateProduct' },
      {
        id,
        userId,
        product,
      },
    );
  }

  async removeProduct(userId: string, id: string) {
    return this.productService.send({ cmd: 'removeProduct' }, { id, userId });
  }
}
