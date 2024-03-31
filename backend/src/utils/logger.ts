import chalk from "chalk";

export class Logger {
  public static i(tag: string, message: string): void {
    const date: string = new Date().toLocaleString();
    console.log(
      chalk.bold.blueBright("[INFO]") +
        chalk.grey(` ${date} - `) +
        chalk.white(`${tag}: ${message}`)
    );
  }

  public static d(tag: string, message: string): void {
    const date: string = new Date().toLocaleString();
    console.log(
      chalk.bold.greenBright("[DEBUG]") +
        chalk.grey(` ${date} - `) +
        chalk.white(`${tag}: ${message}`)
    );
  }

  public static w(tag: string, message: string): void {
    const date: string = new Date().toLocaleString();
    console.log(
      chalk.bold.yellowBright("[WARNING]") +
        chalk.grey(` ${date} - `) +
        chalk.white(`${tag}: ${message}`)
    );
  }

  public static e(tag: string, message: string, error: unknown = null): void {
    const date: string = new Date().toLocaleString();

    console.log(
      chalk.bold.redBright("[ERROR]") +
        chalk.grey(` ${date} - `) +
        chalk.white(`${tag}: ${message}`)
    );

    if (error && error instanceof Error) {
      console.log(chalk.bold.redBright(error.stack));
    }
  }
}
