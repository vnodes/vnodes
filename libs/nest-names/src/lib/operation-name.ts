import { ResourceOperation } from "@vnodes/types";

export const operationNames = Object.values(ResourceOperation);

export const operationExp = new RegExp(`${operationNames.join("|")}$`);
