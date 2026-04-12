import { redirect } from "react-router";
import { ApiClientError, createApiClient } from "~/lib/api-client";
import type {
  CareInfo,
  Garden,
  GardenCreatePayload,
  GardenInvitation,
  GardenMember,
  GardenUpdatePayload,
  LoginPayload,
  Note,
  NoteCreatePayload,
  NoteUpdatePayload,
  Plant,
  PlantCreatePayload,
  PlantUpdatePayload,
  RegisterPayload,
  TokenResponse,
  User,
  UserUpdatePayload,
} from "~/lib/types";

function client(token?: string) {
  const api = createApiClient(process.env.API_BASE_URL!, token);

  async function guard<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        throw redirect("/auth/logout");
      }
      throw err;
    }
  }

  return {
    get: <T>(path: string) => guard<T>(() => api.get<T>(path)),
    post: <T>(path: string, body?: unknown) => guard<T>(() => api.post<T>(path, body)),
    patch: <T>(path: string, body: unknown) => guard<T>(() => api.patch<T>(path, body)),
    delete: (path: string) => guard<void>(() => api.delete(path)),
  };
}

// Auth
export async function registerUser(
  data: RegisterPayload
): Promise<TokenResponse> {
  return client().post<TokenResponse>("/auth/register", data);
}

export async function loginUser(data: LoginPayload): Promise<TokenResponse> {
  return client().post<TokenResponse>("/auth/login", data);
}

// Users
export async function getMe(token: string): Promise<User> {
  return client(token).get<User>("/users/me");
}

export async function updateMe(
  token: string,
  data: UserUpdatePayload
): Promise<User> {
  return client(token).patch<User>("/users/me", data);
}

// Gardens
export async function listGardens(token: string): Promise<Garden[]> {
  return client(token).get<Garden[]>("/gardens");
}

export async function getGarden(token: string, slug: string): Promise<Garden> {
  return client(token).get<Garden>(`/gardens/${slug}`);
}

export async function createGarden(
  token: string,
  data: GardenCreatePayload
): Promise<Garden> {
  return client(token).post<Garden>("/gardens", data);
}

export async function updateGarden(
  token: string,
  slug: string,
  data: GardenUpdatePayload
): Promise<Garden> {
  return client(token).patch<Garden>(`/gardens/${slug}`, data);
}

export async function deleteGarden(
  token: string,
  slug: string
): Promise<void> {
  return client(token).delete(`/gardens/${slug}`);
}

// Plants
export async function listPlants(
  token: string,
  gardenSlug: string
): Promise<Plant[]> {
  return client(token).get<Plant[]>(`/gardens/${gardenSlug}/plants`);
}

export async function getPlant(
  token: string,
  gardenSlug: string,
  plantId: string
): Promise<Plant> {
  return client(token).get<Plant>(`/gardens/${gardenSlug}/plants/${plantId}`);
}

export async function createPlant(
  token: string,
  gardenSlug: string,
  data: PlantCreatePayload
): Promise<Plant> {
  return client(token).post<Plant>(`/gardens/${gardenSlug}/plants`, data);
}

export async function updatePlant(
  token: string,
  gardenSlug: string,
  plantId: string,
  data: PlantUpdatePayload
): Promise<Plant> {
  return client(token).patch<Plant>(
    `/gardens/${gardenSlug}/plants/${plantId}`,
    data
  );
}

export async function deletePlant(
  token: string,
  gardenSlug: string,
  plantId: string
): Promise<void> {
  return client(token).delete(`/gardens/${gardenSlug}/plants/${plantId}`);
}

export async function getPlantCareInfo(
  token: string,
  gardenSlug: string,
  plantId: string
): Promise<CareInfo> {
  return client(token).post<CareInfo>(
    `/gardens/${gardenSlug}/plants/${plantId}/care`
  );
}

// Notes
export async function createNote(
  token: string,
  gardenSlug: string,
  plantId: string,
  data: NoteCreatePayload
): Promise<Note> {
  return client(token).post<Note>(
    `/gardens/${gardenSlug}/plants/${plantId}/notes`,
    data
  );
}

export async function updateNote(
  token: string,
  gardenSlug: string,
  plantId: string,
  noteId: string,
  data: NoteUpdatePayload
): Promise<Note> {
  return client(token).patch<Note>(
    `/gardens/${gardenSlug}/plants/${plantId}/notes/${noteId}`,
    data
  );
}

export async function deleteNote(
  token: string,
  gardenSlug: string,
  plantId: string,
  noteId: string
): Promise<void> {
  return client(token).delete(
    `/gardens/${gardenSlug}/plants/${plantId}/notes/${noteId}`
  );
}

// Garden members
export async function listMembers(
  token: string,
  gardenSlug: string
): Promise<GardenMember[]> {
  return client(token).get<GardenMember[]>(`/gardens/${gardenSlug}/members`);
}

export async function inviteMember(
  token: string,
  gardenSlug: string,
  email: string
): Promise<GardenInvitation> {
  return client(token).post<GardenInvitation>(
    `/gardens/${gardenSlug}/members/invite`,
    { email }
  );
}

export async function removeMember(
  token: string,
  gardenSlug: string,
  userId: string
): Promise<void> {
  return client(token).delete(`/gardens/${gardenSlug}/members/${userId}`);
}

// Invitations
export async function acceptInvitation(
  token: string,
  invitationToken: string
): Promise<GardenMember> {
  return client(token).post<GardenMember>(
    `/invitations/${invitationToken}/accept`
  );
}
