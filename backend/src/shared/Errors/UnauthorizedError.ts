import AppError from './AppError';

export default class UnauthorizedError extends AppError {
  static code = 401;

  constructor(text: string) {
    super({ message: text, statusCode: UnauthorizedError.code });
  }
}
