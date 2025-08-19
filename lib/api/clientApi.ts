// lib/api/clientApi.ts
'use client';

import api from './api';
import type { Note, NewNoteData } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Клієнтські запити йдуть через проксі на серверний Route
export async function fetchNotesClient(
  query = '',
  page = 1,
  perPage = 12,
  tag?: string,
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query;
  if (tag && tag.toLowerCase() !== 'all') params.tag = tag;

  const res = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
}

export async function fetchNoteByIdClient(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNoteClient(data: NewNoteData): Promise<Note> {
  const res = await api.post<Note>('/notes', data);
  return res.data;
}

export async function deleteNoteClient(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function register(data: RegisterRequest): Promise<User> {
  const res = await api.post<User>('/auth/register', data, {
    withCredentials: true,
  });
  return res.data;
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await api.post<User>('/auth/login', data, {
    withCredentials: true,
  });
  return res.data;
}
