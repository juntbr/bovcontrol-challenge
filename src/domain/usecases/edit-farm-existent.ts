export type EditFarmParams = {
  id: number;
};

export interface EditFarmExistent {
  execute(params: EditFarmParams): Promise<undefined>;
}
