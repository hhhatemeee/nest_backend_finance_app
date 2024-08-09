import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { CategoryService } from './category.service'

import { Category } from './models/category.model'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { UseGuards } from '@nestjs/common'
import { UserRequest } from 'src/decorators/dto/user.dto'
import { GqlAuthGuard } from 'src/auth/guards/gql.guard'
import { GqlUser } from 'src/decorators/GqlUser.decorator'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  @UseGuards(GqlAuthGuard)
  async categories(@GqlUser() user: UserRequest) {
    return this.categoryService.findAll(user)
  }

  @Query(() => Category)
  @UseGuards(GqlAuthGuard)
  async category(@Args('id') id: number, @GqlUser() user: UserRequest) {
    return this.categoryService.getById(id, user)
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('data') data: CreateCategoryInput,
    @GqlUser() user: UserRequest,
  ) {
    return this.categoryService.create(data, user)
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('data') data: UpdateCategoryInput,
    @GqlUser() user: UserRequest,
  ) {
    return this.categoryService.update(data, user)
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async removeCategory(@Args('id') id: number, @GqlUser() user: UserRequest) {
    return this.categoryService.remove(id, user)
  }
}
