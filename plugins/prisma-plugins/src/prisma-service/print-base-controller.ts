import { DMMF } from '@prisma/generator-helper';
import { isUnqiueField } from '@vnodes/prisma-helper';

export function printBaseController(model: DMMF.Model) {
    const generics = [
        ['Create', 'Update']
            .map((e) => {
                return `${e}Input extends P.${model.name}${e}Input = P.${model.name}${e}Input`;
            })
            .join(', '),
        `QueryInput extends QueryMany<P.${model.name}ScalarFieldEnum> = QueryMany<P.${model.name}ScalarFieldEnum>`,
    ].join(',');

    const uniqueFields = model.fields.filter(isUnqiueField);

    const findByKey = uniqueFields.some((e) => {
        return e.isUnique && e.name === 'uuid';
    })
        ? 'Uuid'
        : 'Id';

    return `
    export class Base${model.name}Controller<${generics}> {

    constructor(protected readonly service: Base${model.name}Service){}

    findMany(query: QueryInput) {
        return this.service.findMany(query);
    }

    findOneById(id: string) {
        return this.service.findOneBy${findByKey}(id);
    }

    createOne(data: CreateInput) {
        return this.service.createOne(data);
    }

    updateOneById(id: string, data: UpdateInput) {
        return this.service.updateOneBy${findByKey}(id, data);
    }

    deleteOneById(id: string) {
        return this.service.deleteOneBy${findByKey}(id);
    }
        
    }
    `;
}
