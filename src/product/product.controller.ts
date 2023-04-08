import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { identity } from 'rxjs';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json(
      product,
    );
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(
      products
    );
  }

  @Get('/:id_product')
  async getProduct(@Res() res, @Param('id_product') id_product) {
    const product = await this.productService.getProduct(id_product);
    if (!product) {
      throw new NotFoundException('No se encontro el producto');
    }
    return res.status(HttpStatus.OK).json(
      product,
    );
  }

  @Delete('/delete/:id_product')
  async deleteProduct(@Res() res, @Param('id_product') id_product) {
    const product = await this.productService.deleteProduct(id_product);
    if (!product) {
      throw new NotFoundException('No se encontro el producto');
    }
    return res.status(HttpStatus.OK).json(
      product,
    );
  }

  @Put('/update/:id_product')
  async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO , @Param('id_product') id_product){
    const product = await this.productService.updateProduct(id_product,createProductDTO)
    if (!product) {
      throw new NotFoundException('No se encontro el producto');
    }
    return res.status(HttpStatus.OK).json(
      product,
    );
  }
}
