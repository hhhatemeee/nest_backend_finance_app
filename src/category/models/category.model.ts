import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  icon: string

  @Field()
  isDefault: boolean
}
