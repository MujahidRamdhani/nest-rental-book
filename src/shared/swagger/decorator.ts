import { applyDecorators } from '@nestjs/common';
import { ApiHeaders } from '@nestjs/swagger';
import { SettingService } from '../services/setting.service';

const configService = new SettingService();

export function ApiCustomHeader() {
  return applyDecorators(
    ApiHeaders([
      {
        name: configService.app.versionKey,
        description: 'API version. ieg: 1',
        example: 1,
      }
    ]),
  );
}
