import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/strategy/jwt-auth.guard';
import { CreateProductDTO } from './dto/create-product.dto';
import { Request } from 'express';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addProduct(@Req() req: Request, @Body() product: CreateProductDTO) {
    const user = req.user as { _id: string; username: string; email: string };
    return await this.productService.addProduct(user._id, product);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getMyProducts(@Req() req: Request) {
    const user = req.user as { _id: string; username: string; email: string };
    return await this.productService.getMyProducts(user._id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getMyProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
  ) {
    const user = req.user as { _id: string; username: string; email: string };
    return await this.productService.updateProduct(user._id, id, product);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async removeProduct(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { _id: string; username: string; email: string };
    return await this.productService.removeProduct(user._id, id);
  }
}
