import path from "path";
import dotenv from "dotenv";
import { isEmpty } from "lodash";
import { existsSync } from "fs";

export const argv: string[] = process.argv.slice(2);

export function prelude(): void | never {
  const envPathName = path.join(process.cwd(), ".env");
  const appConfig = require(path.join(process.cwd(), "app.config.json"));

  if (process.env.NODE_ENV === "production" || existsSync(envPathName)) {
    dotenv.config();

    const missingValues = appConfig.env.filter(
      (key: string) => process.env[key] === undefined
    );
    if (!isEmpty(missingValues)) {
      throw new Error(
        `Sorry [ ${missingValues.join(
          ", "
        )}] value(s) are missings on your .env file`
      );
    }
  } else {
    throw new Error("Sorry your .env file is missing");
  }
}
