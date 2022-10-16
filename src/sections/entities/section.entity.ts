import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sections'})
export class Section {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  

  @Column({
    type: 'varchar',
    length: 45,
    unique: true
  })
  name: string;


  @Column({
    type: 'boolean',
    default: true
  })

  isActive: boolean;






}
