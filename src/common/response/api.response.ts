import { ResponseStatus } from './response.status';
import { Exclude } from 'class-transformer';

export class ApiResponse<T> {
  @Exclude() private readonly statusCode: number;
  @Exclude() private readonly message: string;
  @Exclude() private readonly error: string;
  @Exclude() private readonly data: T;

  private constructor(
    statusCode: ResponseStatus,
    message: string,
    error: string,
    data: T,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = data;
  }

  static OK(): ApiResponse<string> {
    return new ApiResponse<string>(ResponseStatus.OK, 'OK', '', '');
  }

  static OK_WITH<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(ResponseStatus.OK, 'OK', '', data);
  }
}
