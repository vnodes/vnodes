import { writeFileSync } from "node:fs";
import { errorCodes } from "./error-codes.mjs";
import { errorNames } from "./error-names.mjs";

/**
 * Create error class
 * @param {string} name
 * @returns
 */
function createErrror(name, code) {
    return [
        `export class ${name}Error extends BaseError {`,
        `  constructor(message: string, context?: Record<string, string | number>) {`,
        `    super(message, ${code}, context);`,
        `  }`,
        `}`,
    ].join("\n");
}

function genearteErrors() {
    const code = [`import { BaseError } from './base-error.js';`];

    for (const [error, errorCode] of errorNames) {
        code.push(createErrror(error, errorCode));
    }

    return code.join("\n\n");
}

function generateErrorCode() {
    const code = Object.entries(errorCodes)
        .map(([name, statusCode]) => {
            return `${name} = ${statusCode}`;
        })
        .join(", ");
    return `export enum ErrorCode { 
      ${code} 
    }`;
}

writeFileSync("src/lib/errors.ts", genearteErrors(), {
    encoding: "utf-8",
});

writeFileSync("src/lib/error-code.ts", generateErrorCode(), { encoding: "utf-8" });
