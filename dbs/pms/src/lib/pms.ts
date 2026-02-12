import { DataSource, type EntityManager } from "typeorm";
import {
    Attribute,
    AttributeView,
    ModelRecord,
    ModelType,
    ProductView,
    Value,
    ValueView,
} from "./record/record.entity.js";

export async function pms() {
    const ds = new DataSource({
        type: "better-sqlite3",
        database: "database.sqlite",
        enableWAL: true,
        entities: [ModelType, ModelRecord, Attribute, AttributeView, Value, ProductView, ValueView],

        synchronize: true,
        dropSchema: true,
    });

    const con = await ds.initialize();

    const typeRepo = con.getRepository(ModelType);
    const keyRepo = con.getRepository(Attribute);
    const valueRepo = con.getRepository(Value);
    const valueViewRepo = con.getRepository(ValueView);
    const recordRepo = con.getRepository(ModelRecord);
    const productView = con.getRepository(ProductView);

    const userType = await typeRepo.save({ name: "User" });
    const productType = await typeRepo.save({ name: "Product" });
    const categoryType = await typeRepo.save({ name: "Category" });

    await keyRepo.save({ name: "uuid", type: { id: userType.id } });
    await keyRepo.save({ name: "username", type: { id: userType.id } });
    await keyRepo.save({ name: "password", type: { id: userType.id } });

    const productUuid = await keyRepo.save({ name: "uuid", type: { id: productType.id } });
    const productName = await keyRepo.save({ name: "name", type: { id: productType.id } });
    const productDescription = await keyRepo.save({ name: "description", type: { id: productType.id } });

    console.log(await valueViewRepo.find());
}

async function createProduct(manager: EntityManager, record: any) {
    const type = await manager.findOneBy(ModelType, { name: "Product" });
    const productKeys = await manager.find(AttributeView, { where: { type: type?.name } });

    for (const key of productKeys) {
        if (record[key.key]) {
        }
    }

    const newRecord = await manager.save(manager.create(ModelRecord, {}));
}
