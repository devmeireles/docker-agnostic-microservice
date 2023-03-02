import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { Producer } from 'kafkajs';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) { }

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    this.authService.signUp(authCredentialsDto);

    await this.kafkaProducer.send({
      topic: 'register-topic',
      messages: [{ key: 'register', value: JSON.stringify(authCredentialsDto) }],
    });
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
