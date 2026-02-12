/** biome-ignore-all lint/suspicious/noExplicitAny: Any */
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    ViewColumn,
    ViewEntity,
} from "typeorm";

@Entity()
export class ModelType {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: "text", unique: true }) name: string;

    @ManyToMany(() => Attribute, { eager: true })
    keys: Attribute[];
}

@Entity()
export class ModelRecord {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => ModelType, { onDelete: "RESTRICT" })
    @JoinColumn()
    type: ModelType;
}

@Entity()
@Unique(["name", "type"])
export class Attribute {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text" }) name: string;

    @ManyToOne(() => ModelType, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn()
    type: ModelType;
}

@ViewEntity({
    expression(ds) {
        return ds
            .createQueryBuilder()
            .select("key.id", "id")
            .addSelect("key.name", "key")
            .addSelect("type.name", "type")

            .from(Attribute, "key")
            .innerJoin("key.type", "type");
    },
})
export class AttributeView {
    @ViewColumn() id: number;
    @ViewColumn() key: string;
    @ViewColumn() type: string;
}

@Entity()
@Unique(["key", "record"])
export class Value {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text" }) value: string;

    @ManyToOne(() => Attribute, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        eager: true,
    })
    @JoinColumn()
    key: Attribute;

    @ManyToOne(() => ModelRecord, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn()
    data: ModelRecord;
}

@ViewEntity({
    expression(ds) {
        return ds
            .createQueryBuilder()
            .select("value.id", "id")
            .addSelect("value.value", "value")
            .addSelect("key.name", "key")
            .addSelect("type.name", "type")
            .from(Value, "value")
            .innerJoin("value.key", "key")
            .innerJoin(ModelType, "type", "type.id = key.typeId");
    },
})
export class ValueView {
    @ViewColumn() id: number;
    @ViewColumn() value: string;
    @ViewColumn() key: string;
    @ViewColumn() type: string;
}

@ViewEntity({
    expression(ds) {
        return ds
            .createQueryBuilder()
            .select("record.id", "id")
            .addSelect("json_group_object(key.name, value.value)", "data")
            .from(ModelRecord, "record")
            .innerJoin("record.type", "type")
            .innerJoin(Value, "value", "value.recordId = record.id")
            .innerJoin("value.key", "key")
            .where("type.name = 'Product'")
            .groupBy("record.id");
    },
})
export class ProductView {
    @ViewColumn() id: number;
    @ViewColumn() data: string;
}
