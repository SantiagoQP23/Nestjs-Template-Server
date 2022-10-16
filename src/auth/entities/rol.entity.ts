import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';



@Entity('roles')
export class Rol {


  @PrimaryGeneratedColumn('increment')
  id: number


  @Column({
    type: 'varchar',
    length: 50, 
    unique: true
    
  })
  name: string;
  
  
  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  description: string


  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @OneToMany(
    () => User,
    user => user.rol,
    {}
  )
  users: User[]

}