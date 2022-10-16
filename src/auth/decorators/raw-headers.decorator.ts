
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';



export const RawHeaders = createParamDecorator(
  (prop: string, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();
    const rawHeaders = req.rawHeaders;

    return rawHeaders;
/* 
    console.log(prop);
    if(!user)
      throw new InternalServerErrorException('User not found (request)');

 */

   /*  return (!prop) 
      ? user
      : user[prop]; */
  }
)