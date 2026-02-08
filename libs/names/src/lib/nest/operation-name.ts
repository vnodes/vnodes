import { NestResourceOperation } from "@vnodes/types";

export const operationNames = Object.values(NestResourceOperation);

export const operationExp = new RegExp(`${operationNames.join("|")}$`);
