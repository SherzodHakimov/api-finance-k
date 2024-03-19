import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MListMeasureService } from './m-list-measure.service';
import { CreateMListMeasureDto } from './dto/create-m-list-measure.dto';
import { UpdateMListMeasureDto } from './dto/update-m-list-measure.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('m-list-measure')
@ApiTags('listMeasure')
export class MListMeasureController {
  constructor(private readonly mListMeasureService: MListMeasureService) {}

  @Post('/create')
  create(@Body() createMListMeasureDto: CreateMListMeasureDto) {
    return this.mListMeasureService.create(createMListMeasureDto);
  }

  @Get('/list')
  findAll() {
    return this.mListMeasureService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string) {
    return this.mListMeasureService.findOne(+id);
  }

  @Patch('/update:id')
  update(@Param('id') id: string, @Body() updateMListMeasureDto: UpdateMListMeasureDto) {
    return this.mListMeasureService.update(+id, updateMListMeasureDto);
  }

  @Delete('/remove:id')
  remove(@Param('id') id: string) {
    return this.mListMeasureService.remove(+id);
  }
}
