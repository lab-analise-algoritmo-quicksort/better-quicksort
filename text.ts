import type { IComparable, IValuable } from "./types";

export class Text implements IValuable<string>, IComparable<Text> {
  #value: string;

  /**
   * Creates an instance of Text with a specified string value.
   *
   * @param value - The string value to initialize the Text instance with.
   */
  constructor(value: string) {
    this.#value = value;
  }

  /**
   * A getter for the value of the Text instance.
   *
   * @returns The value of the Text instance.
   */
  get value(): string {
    return this.#value;
  }

  /**
   * Creates an array of Text instances from an array of strings.
   *
   * @param content - A variable number of strings to create Text instances from.
   * @returns An array of Text instances.
   */
  static factory(...content: Array<string>): Array<Text> {
    const data: Array<Text> = [];

    content.forEach((item) => data.push(new Text(item)));

    return data;
  }

  compareTo(entityB: Text) {
    const parsedEntityA = this.value
      .split("")
      .map((item) => item.charCodeAt(0));

    const parsedEntityB = entityB.value
      .split("")
      .map((item) => item.charCodeAt(0));

    for (
      let index = 0;
      index < Math.min(parsedEntityA.length, parsedEntityB.length);
      index++
    ) {
      if (parsedEntityA[index] !== parsedEntityB[index]) {
        const operation = parsedEntityA[index] - parsedEntityB[index];

        return operation < 0 ? -1 : operation === 0 ? 0 : 1;
      }
    }

    const operation = parsedEntityA.length - parsedEntityB.length;

    return operation < 0 ? -1 : operation === 0 ? 0 : 1;
  }
}
