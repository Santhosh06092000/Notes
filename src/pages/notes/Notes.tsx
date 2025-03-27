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
import { useSearchParams } from "react-router";

const Notes: FunctionComponent<NotesProps> = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [_, setSearchParams] = useSearchParams();
  // Fetch Notes
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSearchParams({});
  };

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
        setOpen={handleCloseDialog}
        Dialog_Title={"Notes"}
        Dialog_Content={<NoteForm handleCloseDialog={handleCloseDialog} />}
      />
    </div>
  );
};

export default Notes;
