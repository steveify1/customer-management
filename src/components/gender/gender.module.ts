import { forwardRef, Module, NotFoundException } from '@nestjs/common';
import { GenderController } from './controllers/gender.controller';
import { GenderService } from './services/gender.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gender]),
    forwardRef(() => UserModule)
  ],
  controllers: [GenderController],
  providers: [
    GenderService,
  ],
  exports: [GenderService]
})
export class GenderModule {}
