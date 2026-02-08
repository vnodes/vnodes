export interface ProjectGeneratorSchema {
    type: "lib" | "api" | "db";
    directory: string;
}
