export type EditFarmParams = {
  id: number;
  checklist: any;
};

export interface EditFarmExistent {
  execute(params: EditFarmParams): Promise<undefined>;
}
