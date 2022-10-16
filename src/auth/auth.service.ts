import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { User,Rol } from './entities/';




@Injectable()
export class AuthService {

  logger = new Logger('Auth');


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    private readonly jwtService: JwtService
  ) { }


  async login(loginUserDto: LoginUserDto) {


    const { password, username } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { username },
      select: {
        fullName: true,
        password: true,
        id: true,

      }
    })

    if (!user)
      throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');


    delete user.password;


    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }



  async create(createUserDto: CreateUserDto) {

    try {


      const { password, rol: nameRol, ...userData } = createUserDto;

      const rol = await this.rolRepository.findOneBy({name: nameRol});

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        rol
      });

      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };



    } catch (error) {
      this.handleDBExceptions(error)
    }


  }


 async getRoles () {
  
  return this.rolRepository.find();

 }

 async getRol(name: string){

  return 
 }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }


  private handleDBExceptions(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);


    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
