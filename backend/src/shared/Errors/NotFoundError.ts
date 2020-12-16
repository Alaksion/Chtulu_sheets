import AppError from './AppError';

export default class NotFoundError extends AppError {
  static code = 404;

  constructor(text: string) {
    super({ message: text, statusCode: NotFoundError.code });
  }
}
