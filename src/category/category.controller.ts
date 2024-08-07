import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { Prisma } from '@prisma/client'
import { CategoryDto } from './dto/category.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body(new ValidationPipe()) data: CategoryDto) {
    return this.categoryService.create(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
  ) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id)
  }
}
