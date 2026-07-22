import type { ColumnName, ColumnOptions, DataModel, EnumModel } from './model.js';

export class ModelsManager {
  protected readonly __modelRegistry = new Map<string, () => DataModel>();
  protected readonly __enumRegistry = new Map<string, () => EnumModel>();

  get registry(): ReadonlyMap<string, () => DataModel> {
    return this.__modelRegistry;
  }

  protected getProperties(model: DataModel): ColumnOptions[] {
    const extendedProperties = model.extendings
      ? model.extendings.flatMap((e) => {
          return this.getProperties(this.getDataModel(e));
        })
      : [];

    return [model.properties, extendedProperties].filter((e) => e !== undefined).flatMap((e) => e);
  }

  protected getRequiredColumnNames(model: DataModel): string[] {
    const extededRequiredColumnNames = model.extendings
      ? model.extendings.flatMap((e) => this.getRequiredColumnNames(this.getDataModel(e)))
      : [];

    return [model.required, extededRequiredColumnNames]
      .filter((e) => e !== undefined)
      .flatMap((e) => e);
  }

  protected getDataModelSafe(modelName: string): DataModel | undefined {
    const model = this.__modelRegistry.get(modelName);

    if (model) {
      const content = model();
      content.properties = this.getProperties(content);
      content.required = this.getRequiredColumnNames(content) as ColumnName[];
      return content;
    }
    return undefined;
  }

  setDataModel(modelName: string, model: () => DataModel): void | never {
    if (this.getDataModelSafe(modelName)) {
      throw new Error(`${modelName} model already registerted`);
    }
    this.__modelRegistry.set(modelName, model);
  }

  getDataModel(modelName: string): DataModel | never {
    const model = this.getDataModelSafe(modelName);

    if (!model) {
      throw new Error(`${modelName} model is not found`);
    }
    return model;
  }

  getEnumModelSafe(modelName: string): EnumModel | undefined {
    return this.__enumRegistry.get(modelName)?.();
  }

  getEnumModel(modelName: string): EnumModel | never {
    const model = this.getEnumModelSafe(modelName);

    if (!model) {
      throw new Error(`${modelName} enum model is not found`);
    }

    return model;
  }
}
