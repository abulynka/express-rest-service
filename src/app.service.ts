import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private defaultMessage = 'Service is running!';

  public getHello(): string {
    return this.defaultMessage;
  }
}
