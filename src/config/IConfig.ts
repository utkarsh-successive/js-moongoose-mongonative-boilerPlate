import { ISwaggerDefinition } from '../libs/documentation/swagger/Swagger';

export interface IConfig extends ISwaggerDefinition {
  env: string;
  apiPrefix: string;
  port: string;
  corsOrigin: string;
  mongo: string;
  mongooseDebug: boolean;
  swaggerUrl: string;
  secret: string;
  databaseName: string;
  isSeedingSchemaValidationActive: string;
  isSeedingIndexes: string;
}
