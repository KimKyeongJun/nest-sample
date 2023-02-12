import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export abstract class PageReq {
  @Type(() => Number)
  @IsNumber()
  readonly page = 1;

  @Type(() => Number)
  @IsNumber()
  readonly pageSize = 10;

  getOffset(): number {
    return (this.page - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }

  getLimitWithNext(): number {
    return this.pageSize + 1;
  }
}
