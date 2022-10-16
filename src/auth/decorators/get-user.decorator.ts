


import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';



export const GetUser = createParamDecorator(
  (prop: string, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;


    console.log(prop);
    if(!user)
      throw new InternalServerErrorException('User not found (request)');



    return (!prop) 
      ? user
      : user[prop];
  }
)