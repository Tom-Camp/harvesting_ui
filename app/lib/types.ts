export type PlantType =
  | "herb"
  | "vegetable"
  | "fruit"
  | "flower"
  | "shrub"
  | "tree"
  | "vine";

export type UnitType =
  | "items"
  | "g"
  | "kg"
  | "oz"
  | "lbs"
  | "bunches"
  | "bags"
  | "jars";

export type NoteType = "milestone" | "action" | "note" | "pest" | "harvest";

export type UserStatus = "pending" | "active" | "suspended";
export type UserRole = "user" | "admin";
export type GardenMemberRole = "owner" | "member";

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  picture: string | null;
  status: UserStatus;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Garden {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  location: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  note: string | null;
  label: NoteType;
  created_at: string;
  updated_at: string;
}

export interface CareInfo {
  id: string;
  planting: string | null;
  care: string | null;
  harvesting: string | null;
  latin_name: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface Harvest {
  id: string;
  plant_id: string;
  amount: number;
  unit: UnitType;
  created_at: string;
  updated_at: string;
}

export interface Plant {
  id: string;
  garden_id: string;
  plant_type: PlantType;
  species: string;
  variety: string | null;
  latin_name: string | null;
  harvest_unit: UnitType | null;
  notes: Note[] | null;
  harvests: Harvest[] | null;
  care_info: CareInfo | null;
  planted_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface GardenMember {
  id: string;
  garden_id: string;
  user_id: string;
  role: GardenMemberRole;
  created_at: string;
  user: User;
}

export interface GardenInvitation {
  id: string;
  garden_id: string;
  invited_email: string;
  token: string;
  expires_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface ApiError {
  message: string;
  status: number;
}

// Request payload types
export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface GardenCreatePayload {
  name: string;
  location: string;
  notes?: string;
}

export interface GardenUpdatePayload {
  name?: string;
  location?: string;
  notes?: string;
}

export interface PlantCreatePayload {
  plant_type: PlantType;
  species: string;
  variety?: string;
  planted_date?: string;
}

export interface PlantUpdatePayload {
  variety?: string;
  notes?: string;
  planted_date?: string;
  harvest_unit?: UnitType;
}

export interface HarvestCreatePayload {
  amount: number;
  unit: UnitType;
}

export interface HarvestUpdatePayload {
  amount?: number;
}

export interface NoteCreatePayload {
  label: NoteType;
  note?: string;
}

export interface NoteUpdatePayload {
  label?: NoteType;
  note?: string;
}

export interface UserUpdatePayload {
  first_name?: string;
  last_name?: string;
  picture?: string;
}
