import codes from '@config/StatusCode';

export default class AppError {
  public message: string;

  public statusCode: number;

  public name: String;

  public timestamp: Date;

  constructor(message: string, statusCode = 400) {
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
