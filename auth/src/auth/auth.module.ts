import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'topSecretHash',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:29092'],
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE'],
    }
  ],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule { }
