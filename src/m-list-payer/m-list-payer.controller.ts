import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { MListPayerService } from './m-list-payer.service';
import { CreateMListPayerDto } from './dto/create-m-list-payer.dto';
import { UpdateMListPayerDto } from './dto/update-m-list-payer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-payer')
@UsePipes(new ValidationPipe())
@ApiTags('listPayer')
export class MListPayerController {
  constructor(private readonly mListPayerService: MListPayerService) {}

  @Post('/create')
  create(@Body() createMListPayerDto: CreateMListPayerDto) {
    return this.mListPayerService.create(createMListPayerDto);
  }
  
  @Get('/list')
  findAll() {
    return this.mListPayerService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.mListPayerService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateMListPayerDto: UpdateMListPayerDto) {
    return this.mListPayerService.update(+id, updateMListPayerDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.mListPayerService.remove(+id);
  }
}
