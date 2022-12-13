export class ErrorLog {
  static log(description: string, error: Error) {
    console.error(error, description);
    // if (__DEV__) {
    //   //@ts-ignore
    //   console.tron.log(description, error);
    // }
  }
}
