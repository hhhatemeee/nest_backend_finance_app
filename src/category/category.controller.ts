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
import { User } from 'src/decorators/user.decorator'
import { UserRequest } from 'src/decorators/dto/user.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new ValidationPipe()) data: CategoryDto,
    @User() user: UserRequest,
  ) {
    return this.categoryService.create(data, user.role)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
    @User() user: UserRequest,
  ) {
    return this.categoryService.update(id, updateCategoryDto, user.role)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserRequest) {
    return this.categoryService.remove(id, user.role)
  }
}
