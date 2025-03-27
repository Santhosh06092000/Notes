import "../Notes.scss";
import { FunctionComponent, memo } from "react";
import { INote } from "../INotes";
import Note from "./Note";
import { motion } from "motion/react";
interface NotesListProps {
  notes: INote[];
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesList: FunctionComponent<NotesListProps> = (props) => {
  const { notes, setOpenDialog } = props;

  return (
    <>
      {notes.map((note, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: i / 10,
          }}
          key={i}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key={note.note_id}
          >
            <Note note={note} setOpenDialog={setOpenDialog} />
          </motion.div>
        </motion.span>
      ))}
    </>
  );
};

export default memo(NotesList);
