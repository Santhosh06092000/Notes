import "../Notes.scss";
import { FunctionComponent, useState } from "react";
import Card from "../../../components/card/Card";
import CardHeader from "../../../components/card/CardHeader";
import Typography from "../../../components/Typography/Typography";
import CardBody from "../../../components/card/CardBody";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { dateFormatter } from "../../../utils/dateFormatter";
import { INote } from "../INotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../../auth/notes_auth";
import { useSearchParams } from "react-router";

interface NoteProps {
  note: INote;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const Note: FunctionComponent<NoteProps> = (props) => {
  const { note, setOpenDialog } = props;
  const [_, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [isDelete, setIsDelete] = useState(false);

  // Delete Note Mutation
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  // Handle Note Deletion
  const handleDeleteNote = (note_id: string) => {
    deleteNoteMutation.mutate(note_id);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <Typography>{note.note_title}</Typography>

          <IconButton onClick={() => setIsDelete(true)}>
            <RemoveCircleOutlineIcon color="error" />
          </IconButton>
        </CardHeader>

        {isDelete ? (
          <div className="delete-content">
            <span>Are you sure want to delete?</span>
            <span className="note-form-actions">
              <Button
                onClick={() => handleDeleteNote(note.note_id!)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button onClick={() => setIsDelete(false)} variant="contained">
                Cancel
              </Button>
            </span>
          </div>
        ) : (
          <>
            <CardBody
              className="note-content"
              onClick={() => {
                setSearchParams({ note_id: note.note_id! });
                setOpenDialog(true);
              }}
            >
              {note.note_content}
              <footer className="note-footer">
                Last Modified:{" "}
                {dateFormatter(note.last_update, "ddd, DD MMM YYYY")}
              </footer>
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
};

export default Note;
