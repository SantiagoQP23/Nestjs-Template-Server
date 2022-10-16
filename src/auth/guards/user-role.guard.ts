
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get('roles', context.getHandler());

    // If there aren't roles
    if (!validRoles) return true;
        
    // If there aren't roles
    if (validRoles.length === 0) return true;


    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (validRoles.includes(user.rol.name)) {
      return true;
    }

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`
    )



  }
}
