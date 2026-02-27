import { CrudController } from '../lib/custom/index.js';

class ReadDto {}
class CreateDto {}
class UpdateDto {}
class QueryDto {}

@CrudController({
    createDto: CreateDto,
    updateDto: UpdateDto,
    queryDto: QueryDto,
    readDto: ReadDto,
})
export class SampleController {}
