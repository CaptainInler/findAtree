export class Utils {

  static contains(stringArray: Array<string>, word: string): boolean {
    let i = stringArray.length;
    while (i--) {
      if (stringArray[i] === word) {
        return true;
      }
    }
    return false;
  }

  // delta: days
  static getDate(delta: number = 0): string {
    const newDate = new Date(Date.now() + delta * 1000 * 3600 * 24);
    const dd = ("0" + newDate.getDate()).slice(-2);
    const mm = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const yy = ("0" + (newDate.getFullYear())).slice(-2);
    // let yyyy = newDate.getFullYear();

    return yy.toString() + mm + dd;
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // delta: minutes
  static getTime(delta: number = 0): string {
    const newDate = new Date(Date.now() + delta * 1000 * 60);
    const dd = ("0" + newDate.getSeconds()).slice(-2);
    const mm = ("0" + (newDate.getMinutes())).slice(-2);
    const yy = ("0" + (newDate.getHours())).slice(-2);
    // let yyyy = newDate.getFullYear();

    return yy.toString() + mm + dd;
  }

  static shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

}
