export interface RequirementPayLoad {
  requirementName: string;
  requirementCode: string;
  requirementDetails: string;
}


export interface RequirementResponse extends RequirementPayLoad {
  requirementID: number;
}

export interface RequirementUpdatePayLoad extends RequirementPayLoad {
  requirementID: number;
}

export interface RequirementList{
  requirementID:number,
  requirementName:string
}