export interface ProjectGeneratorSchema {
    type: "lib" | "api" | "db";
    org: string;
    directory: string;
    email: string;
}
