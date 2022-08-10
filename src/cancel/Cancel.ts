export default class Cancel {
  message?: string

  static isCancel(value: any): boolean {
    return value instanceof Cancel
  }

  constructor(message?: string) {
    this.message = message
  }
}
