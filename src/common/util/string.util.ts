import { v4 as uuid4 } from 'uuid';

export default class StringUtil {
  static generateUUID(): string {
    return uuid4();
  }

  static generateUserCode(length = 6): string {
    return Math.random()
      .toString(36)
      .replace('.', '')
      .toUpperCase()
      .substring(2, length + 2);
  }
}
