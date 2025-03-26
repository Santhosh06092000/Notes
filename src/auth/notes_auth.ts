import { useQuery } from "@tanstack/react-query";
import { INote } from "../pages/notes/INotes";
import api from "../redux/axios/middleware";

// Fetch all notes
export const fetchNotes = async (): Promise<INote[]> => {
  const response = await api.get(`/notes/`);
  return response.data;
};

// Create a new note
export const createNote = async (
  newNote: Omit<INote, "note_id">
): Promise<INote> => {
  const response = await api.post(`/notes/`, newNote);
  return response.data;
};

// get one
export const fetchNoteById = async (noteId: string): Promise<INote> => {
  const response = await api.get(`/notes/${noteId}`);
  return response.data;
};

// Update a note
export const updateNote = async (note: INote): Promise<INote> => {
  const response = await api.put(`/notes/${note.note_id}`, note);
  return response.data;
};

// Delete a note
export const deleteNote = async (note_id: string): Promise<void> => {
  await api.delete(`/notes/${note_id}`);
};

export const useGetOneNoteById = (note_id: string) => {
  return useQuery({
    queryKey: ["note", note_id],
    queryFn: () => fetchNoteById(note_id),
    enabled: !!note_id, // Only fetch if note_id is available
  });
};
