import type { Any } from '../common/any.js';

/**
 * A type-safe representation of a standard package.json file.
 */
export type PackageJson = {
    name: string;
    version: string;
    description?: string;
    main?: string;
    module?: string;
    types?: string;
    typings?: string;
    bin?: string | Record<string, string>;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    funding?: string[];
    engines?: {
        node?: string;
        npm?: string;
        [key: string]: string | undefined;
    };
    repository?: string | { type: string; url: string; directory?: string };
    keywords?: string[];
    author?: string | { name: string; email?: string; url?: string };
    license?: string;
    bugs?: string | { url?: string; email?: string };
    homepage?: string;
    icon?: string;
    [customTool: string]: Any;
};
