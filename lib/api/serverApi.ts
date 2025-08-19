// lib/api/serverApi.ts
import api from './api';
import type { Note, NewNoteData } from '@/types/note';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Отримати cookies з поточного запиту

export async function getAuthHeaders() {
  const cookieStore = await cookies(); // обов’язково await
  const cookieArray = Array.from(cookieStore.getAll());
  const cookieString = cookieArray.map(c => `${c.name}=${c.value}`).join('; ');
  return { Cookie: cookieString };
}

// Серверні функції
export async function fetchNotesServer(
  query = '',
  page = 1,
  perPage = 12,
  tag?: string,
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query;
  if (tag && tag.toLowerCase() !== 'all') params.tag = tag;

  const headers = await getAuthHeaders();
  const res = await api.get<FetchNotesResponse>('/notes', { params, headers });
  return res.data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const headers = await getAuthHeaders();
  const res = await api.get<Note>(`/notes/${id}`, { headers });
  return res.data;
}

export async function createNoteServer(data: NewNoteData): Promise<Note> {
  const headers = await getAuthHeaders();
  const res = await api.post<Note>('/notes', data, { headers });
  return res.data;
}

export async function deleteNoteServer(id: string): Promise<Note> {
  const headers = await getAuthHeaders();
  const res = await api.delete<Note>(`/notes/${id}`, { headers });
  return res.data;
}

export async function fetchProfileServer(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const cookieArray = cookieStore.getAll();
    const cookieString = cookieArray
      .map(c => `${c.name}=${c.value}`)
      .join('; ');

    const res = await api.get<User>('/users/me', {
      headers: { Cookie: cookieString },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
