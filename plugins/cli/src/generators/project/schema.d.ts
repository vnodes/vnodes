export interface ProjectGeneratorSchema {
    type: 'lib' | 'api' | 'db';
    directory: string;
    org: string;
    email: string;
    homepage: string;
    funding: string;
}
