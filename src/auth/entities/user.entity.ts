
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from './rol.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  fullName: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100
  })
  username: string;

  @Column({
    type: "varchar",
    length: 60
  })
  password: string;


  @Column('boolean', {
    default: false
  })
  online: boolean


  @Column('boolean', {
    default: true
  })
  isActive: boolean


  @ManyToOne(
    () => Rol,
    rol => rol.users,
    {cascade: true, eager: true}
  )
  rol: Rol



}
