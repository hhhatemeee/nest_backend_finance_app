import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { CategoryService } from './category.service'

import { Category } from './models/category.model'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { User } from 'src/decorators/user.decorator'
import { UserRequest } from 'src/decorators/dto/user.dto'
import { GqlAuthGuard } from 'src/auth/guards/gql.guard'
import { GqlUser } from 'src/decorators/GqlUser.decorator'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.findAll()
  }

  @Query(() => Category)
  @UseGuards(GqlAuthGuard)
  async category(@Args('id') id: number) {
    return this.categoryService.getById(id)
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('data') data: CreateCategoryInput,
    @GqlUser() user: UserRequest,
  ) {
    return this.categoryService.create(data, user.role)
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('id') id: number,
    @Args('data') data: UpdateCategoryInput,
    @GqlUser() user: UserRequest,
  ) {
    return this.categoryService.update(id, data, user.role)
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async removeCategory(@Args('id') id: number, @GqlUser() user: UserRequest) {
    return this.categoryService.remove(id, user.role)
  }
}
