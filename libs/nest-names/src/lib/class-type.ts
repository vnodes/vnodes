import { ClassType } from "@vnodes/types";

export const classTypes = Object.values(ClassType);

export const classTypeExp = new RegExp(`${classTypes.join("|")}$`);
