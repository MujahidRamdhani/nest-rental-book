import fs from 'fs/promises'; // Menggunakan fs/promises untuk async writing
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ISwaggerConfigInterface } from '@/interfaces/swagger.interface';

export async function setupSwagger(app: INestApplication, config: ISwaggerConfigInterface) {
  const baseUrl = config.baseUrl?.replace(/\/$/, '') || 'http://localhost:4000'; 

  const options = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .addServer(`${baseUrl}/api`)
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  try {
    await fs.writeFile('./swagger-spec.json', JSON.stringify(document, null, 2));
    console.log('✅ Swagger spec saved successfully.');
  } catch (error) {
    console.error('❌ Error saving Swagger spec:', error);
  }

  SwaggerModule.setup(config.path, app, document);
}
