export class FakeSocket {
  public static getRandomInt(): number {
    return Math.floor(Math.random() * 100000000);
  }

  public static getRandomFloat(): number {
    const str = (Math.random() * (3.5 - 1.5) + 1.5).toFixed(18);
    return parseFloat(str);
  }

  public static getUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36);
    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8);
    return `${dateStr}-${randomStr}`;
  }

  public static getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  public static mockData(quantity: number) {
    return Array.from({length: quantity}, () => {
      return {
        id: this.getUniqueId(),
        int: this.getRandomInt(),
        float: this.getRandomFloat(),
        color: this.getRandomColor(),
        child: {
          id: this.getUniqueId(),
          color: this.getRandomColor()
        }
      }
    });
  }
}
