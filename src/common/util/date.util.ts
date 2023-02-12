export default class DateUtil {
  static addTime(day = 0, hour = 0, minutes = 0): Date {
    let seconds = 0;
    if (day !== 0) {
      seconds += day * 24 * 60 * 60;
    }
    if (hour !== 0) {
      seconds += hour * 60 * 60;
    }
    if (minutes !== 0) {
      seconds += minutes * 60;
    }
    const currentDate = new Date();
    return new Date(currentDate.getTime() + seconds * 1000);
  }

  static isExpireDate(now: Date, target: Date): boolean {
    if (now > target) {
      return true;
    } else {
      return false;
    }
  }
}
