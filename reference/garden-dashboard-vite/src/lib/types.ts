export type NoteType = 'milestone' | 'action' | 'note' | 'pest' | 'harvest';
export type PlantStatus = 'seedling' | 'growing' | 'harvesting' | 'done';

export interface PlantNote {
  date: string;
  label: NoteType;
  text: string;
}

export interface HarvestEntry {
  date: string;
  value: number;
  unit: string;
}

export interface Plant {
  name: string;
  variety: string;
  color: string;
  status: PlantStatus;
  plantedDate: string;
  daysToMaturity: number;
  bed: string;
  notes: PlantNote[];
  harvests: HarvestEntry[];
  harvestUnit: string;
  totalHarvest: string;
}
