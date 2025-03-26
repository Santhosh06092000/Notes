import "./Notes.scss";
import { FunctionComponent, useState } from "react";
import { NotesProps } from "./INotes";
import { IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NotesList from "./components/NotesList";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../auth/notes_auth";
import Dialog from "../../components/Dialog/Dialog";
import NoteForm from "./NoteForm";

const Notes: FunctionComponent<NotesProps> = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // Fetch Notes
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  return (
    <div className="notes-list">
      <NotesList notes={notes ?? []} setOpenDialog={setOpenDialog} />

      <IconButton
        className="notes-list-footer"
        onClick={() => setOpenDialog(true)}
      >
        <NoteAddIcon />
      </IconButton>

      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        Dialog_Title={"Notes"}
        Dialog_Content={<NoteForm setOpenDialog={setOpenDialog} />}
      />
    </div>
  );
};

export default Notes;
