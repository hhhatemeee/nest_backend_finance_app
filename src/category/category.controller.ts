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
import {
  PayloadCreateCategoryDto,
  PayloadUpdateCategoryDto,
} from './dto/category.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { User } from 'src/decorators/user.decorator'
import { UserRequest } from 'src/decorators/dto/user.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new ValidationPipe()) data: PayloadCreateCategoryDto,
    @User() user: UserRequest,
  ) {
    return this.categoryService.create(data, user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: UserRequest) {
    return this.categoryService.findAll(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User() user: UserRequest) {
    return this.categoryService.getById(id, user)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update(
    @Body(new ValidationPipe()) updateCategoryDto: PayloadUpdateCategoryDto,
    @User() user: UserRequest,
  ) {
    return this.categoryService.update(updateCategoryDto, user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserRequest) {
    return this.categoryService.remove(id, user)
  }
}
