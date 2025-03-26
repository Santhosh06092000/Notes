import "../Notes.scss";
import { FunctionComponent } from "react";
import { INote } from "../INotes";
import Note from "./Note";
interface NotesListProps {
  notes: INote[];
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesList: FunctionComponent<NotesListProps> = (props) => {
  const { notes, setOpenDialog } = props;

  return (
    <>
      {notes.map((note) => (
        <Note note={note} setOpenDialog={setOpenDialog} key={note.note_id} />
      ))}
    </>
  );
};

export default NotesList;
