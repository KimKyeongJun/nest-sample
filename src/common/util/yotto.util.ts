export default class YottoUtil {
  static generateYotto(): string {
    const numbers: Array<number> = [];
    const selectedNumbers: Array<number> = [];
    //1~46 숫자 셋팅.
    for (let i = 1; i <= 46; i++) {
      numbers.push(i);
    }
    let index = 46;
    let bonusNumber = 0;
    for (let i = 0; i < 7; i++) {
      const selected = Math.floor(Math.random() * index);
      if (i === 6) {
        bonusNumber = numbers[selected];
        break;
      }
      selectedNumbers.push(numbers[selected]);
      numbers.splice(selected, 1);
      index--;
    }
    selectedNumbers.sort((one: number, two: number): number => {
      return one - two;
    });
    selectedNumbers.push(bonusNumber);
    return selectedNumbers.toString();
  }
}
