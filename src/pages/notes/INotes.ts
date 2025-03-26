export interface NotesProps {}

export interface INote {
  note_id?: string;
  note_title: string;
  note_content: string;
  last_update?: string;
  created_on?: string;
}
