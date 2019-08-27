import { HttpException, HttpStatus } from '@nestjs/common';
import { PardGrpcError } from '../../pkg-common/src/interfaces/pard-grpc-error.interface';

enum Language {
  zh_CN = 'zh_CN',
  en_US = 'en_US',
}

interface ErrorMessage { [lang: string]: string; }
interface ErrorMessageWithType { type: string; message: ErrorMessage; }

export class BllError {
  errName = 'BllError';
  constructor(
    public type: string = 'BLL_ERROR',
    public messageDict: {[type: string]: ErrorMessageWithType }  = {},
    public httpStatusSuggested: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
  }

  public static isBllError(err: any) {
    return err && err.errName === 'BllError';
  }

  private defaultMessageDict: ErrorMessage = {
    [Language.zh_CN]: '出错了',
    [Language.en_US]: 'Error',
  };

  private getMessage(lang: Language = Language.zh_CN, type: string) {
    return this.messageDict[type || this.type] ?
      this.messageDict[type || this.type].message[lang] :
      this.defaultMessageDict[lang];
  }

  toHttp(lang: Language, message?: string, type?: string, status?: HttpStatus) {
    return new HttpException({
      message: message || this.getMessage(lang, type), type: type || this.type,
    }, status || this.httpStatusSuggested || HttpStatus.INTERNAL_SERVER_ERROR);
  }
  toGrpc(message?: string, type?: string) {
    return new PardGrpcError(message, type || this.type);
  }
}
