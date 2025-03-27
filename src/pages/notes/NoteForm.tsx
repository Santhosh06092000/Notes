import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  createNote,
  updateNote,
  useGetOneNoteById,
} from "../../auth/notes_auth";
import { INote } from "./INotes";
import { z } from "zod";
import TextFieldController from "../../components/TextField/TextFieldController";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router";

interface NoteFormProps {
  handleCloseDialog: () => void;
}

const NoteForm: FunctionComponent<NoteFormProps> = (props) => {
  const { handleCloseDialog } = props;
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { data: selectedNote } = useGetOneNoteById(
    searchParams.get("note_id") || ""
  );

  // Create Note Mutation
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      handleCloseDialog();
    },
  });

  // update Mutation
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      handleCloseDialog();
    },
  });

  // schema
  const noteSchema = z.object({
    note_id: z.string().optional(),
    note_title: z.string({ message: "Please enter title" }),
    note_content: z.string({ message: "Please enter content" }),
  });

  // form
  const methods = useForm<INote>({
    resolver: zodResolver(noteSchema),
  });

  // form submit
  const onSubmit: SubmitHandler<INote> = (val) => {
    if (val.note_id) {
      updateNoteMutation.mutate(val);
    } else {
      createNoteMutation.mutate(val);
    }
    console.log(val);
  };

  useEffect(() => {
    methods.reset(selectedNote);
  }, [selectedNote]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="note-form">
        <TextFieldController name="note_title" placeholder="Title" />

        <TextFieldController
          name="note_content"
          multiline
          minRows={5}
          placeholder="Content..."
        />

        <div className="note-form-actions">
          <Button type="submit" variant="contained" color="success">
            {selectedNote?.note_id ? "Update" : "Add"}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseDialog();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NoteForm;
