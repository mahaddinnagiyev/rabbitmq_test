import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'addProduct' })
  async addProduct(
    @Payload() data: { userId: string; product: CreateProductDTO },
  ) {
    return await this.appService.addProduct(data.userId, data.product);
  }

  @MessagePattern({ cmd: 'getMyProducts' })
  async getMyProducts(@Payload() userId: string) {
    return await this.appService.getUserProducts(userId);
  }

  @MessagePattern({ cmd: 'getProductById' })
  async getProductById(@Payload() id: string) {
    return await this.appService.getProductById(id);
  }

  @MessagePattern({ cmd: 'updateProduct' })
  async updateProduct(
    @Payload() data: { id: string; userId: string; product: UpdateProductDTO },
  ) {
    return await this.appService.updateProduct(
      data.id,
      data.userId,
      data.product,
    );
  }

  @MessagePattern({ cmd: 'removeProduct' })
  async removeProduct(@Payload() data: { id: string; userId: string }) {
    return await this.appService.removeProduct(data.id, data.userId);
  }

  @MessagePattern({ cmd: 'get_user_product' })
  async getUserProduct(@Payload() userId: string) {
    return await this.appService.getUserProducts(userId);
  }
}
