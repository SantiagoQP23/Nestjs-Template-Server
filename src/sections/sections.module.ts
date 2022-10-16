import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SectionsController],


  imports: [
    TypeOrmModule.forFeature([Section]),
    AuthModule
  ],

  providers: [SectionsService]
})
export class SectionsModule {}
