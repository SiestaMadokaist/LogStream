type Constructor<T> = new(...args: any[]) => T;
import { Readable } from 'stream';

export enum LEVEL {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
};

export function LogStream<T extends Constructor<any>>(BaseClass: T){

  const logStreamSymbol = Symbol('logStream');
  return class _LogStream_ extends BaseClass {

    static createReadableStream(): Readable {
      return new Readable({ objectMode: true, read(){} });
    }

    static readonly [logStreamSymbol]: Readable = _LogStream_.createReadableStream();

    logStream(): Readable {
      return _LogStream_[logStreamSymbol];
    }

    log(message: any, level: LEVEL = LEVEL.debug): void {
      this.logStream().push({ message, level });
    }

  }

}
