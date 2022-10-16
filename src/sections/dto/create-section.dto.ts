import { IsString, Min, MinLength } from "class-validator";

export class CreateSectionDto {


  @IsString()
  @MinLength(2)
  name: string;



}
