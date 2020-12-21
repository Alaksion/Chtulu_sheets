import AppError from './AppError';

export default class RegraDeNegocioError extends AppError {
  static code = 400;

  constructor(text: string) {
    super({ message: text, statusCode: RegraDeNegocioError.code });
  }
}
