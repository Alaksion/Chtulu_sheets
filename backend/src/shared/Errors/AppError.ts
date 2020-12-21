import codes from '@enums/StatusCode';

interface IAppError {
  message: string;
  statusCode: number;
}

export default abstract class AppError {
  public message: string;

  public statusCode: number;

  public name: string;

  public timestamp: Date;

  constructor({ message, statusCode }: IAppError) {
    const statusName = codes[statusCode]
      .split(' ')
      .map(w => {
        return w.substr(0, 1).toUpperCase() + w.substr(1);
      })
      .join(' ');
    this.message = message;
    this.statusCode = statusCode;
    this.name = statusName;
    this.timestamp = new Date(Date.now());
  }
}
