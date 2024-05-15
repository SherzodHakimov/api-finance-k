import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req, UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MAuthService } from './m-auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../shared/dto/error.dto';
import { ParamMAuthDto } from './dto/param-m-auth.dto';
import { DataTokenDto } from './dto/data-token.dto';
import { ResponseBodyInterceptor } from '../response-body.interceptor';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('m-auth')
@UsePipes(new ValidationPipe())
@UseInterceptors(ResponseBodyInterceptor)
@ApiTags('Authorization')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Error", type: ErrorDto })
export class MAuthController {
  constructor(private readonly mAuthService: MAuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataTokenDto,
  })
  login(@Body() paramMAuthDto: ParamMAuthDto) {
    return this.mAuthService.login(paramMAuthDto);
  }

  @Get('/update')
  @ApiOperation({ summary: 'Update token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DataTokenDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Req() request: Request) {
    return this.mAuthService.update(request);
  }
}
