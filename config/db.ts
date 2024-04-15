import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "sqlite",
    database: "../checkpoint.sqlite",
    entities: ["src/entities/*.ts"],
    synchronize: true,
});

export default dataSource;
