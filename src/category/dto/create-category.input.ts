import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  isDefault?: boolean
}
