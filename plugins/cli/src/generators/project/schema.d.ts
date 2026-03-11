export interface ProjectGeneratorSchema {
    type: 'lib' | 'api';
    directory: string;
    org: string;
    email: string;
    homepage: string;
    funding: string;
    username: string;
    password: string;
}
