export type ComponentType = 'component' | 'pipe';

export interface ComponentGeneratorSchema {
    name: string;
    project: string;
    type?: ComponentType;
}
