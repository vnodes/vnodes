export type ProjectType = 'lib' | 'api' | 'cli' | 'prisma' | 'prisma-extention' | 'graphql';

export class ProjectGeneratorSchema {
    projectType: ProjectType;
    directory: string;
    homepage = 'https://vnodes.github.io/vnodes';
    email = 'robert.brightline@gmail.com';
    author = 'Robert Brightline';
    funding = 'https://cash.app/$puqlib';
    reponame = 'vnodes';
    orgname = 'vnodes';
    version = '0.0.1';

    constructor(options: Partial<ProjectGeneratorSchema>) {
        Object.assign(this, options);
    }
}
