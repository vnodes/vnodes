import { NestClassType } from "@vnodes/types";

export const classTypes = Object.values(NestClassType);

export const classTypeExp = new RegExp(`${classTypes.join("|")}$`);
