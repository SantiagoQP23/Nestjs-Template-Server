import { Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionsService {

  private readonly logger = new Logger('Sections')

  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>
  ) { }


  async create(createSectionDto: CreateSectionDto) {


    try {

      const { name } = createSectionDto;

      const section = this.sectionRepository.create(
        { name }
      );

      await this.sectionRepository.save(section);


      return {
        section

      }

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.sectionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {

    const { name } = updateSectionDto;

    let section = await this.sectionRepository.preload({
      id,
      name
    })

    console.log({section})
    if (!section) 
      throw new NotFoundException(`Section with id ${id} not found`);

    try {


      await this.sectionRepository.save(section);


      return {
        msg: 'Section has been updated',
        section
      };

    } catch (error) {

      this.handleDBExceptions(error);

    }
  }

  async remove(id: string) {

    const section = await this.sectionRepository.findOneBy({ id });

    if (!section) throw new NotFoundException(`Section with id ${id} not found`);


    await this.sectionRepository.remove(section);


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
