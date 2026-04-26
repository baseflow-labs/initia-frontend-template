import api from "./index";

export interface GeneratorTableMetadata {
  tableName: string;
  endpoint: string;
  fields: string[];
  sortableFields: string[];
  searchableFields: string[];
}

export interface GeneratorTablesPayload {
  tableNames: string[];
  relations: string[];
  tables: GeneratorTableMetadata[];
}

export const tablesList = [
  "users",
  "products",
  "orders",
  "roles",
  "permissions",
  "metadata",
  "files",
  "auth",
];

export const tableRelationsList = [
  "products>orders",
  "users>orders",
  "users>roles",
  "roles>permissions",
];

export const getGeneratorTablesMetadata = async () => {
  return api.get<GeneratorTablesPayload>("/generator/tables");
};
