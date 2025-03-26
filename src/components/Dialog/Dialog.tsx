import "./Dialog.scss";

import Dialogs from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { DialogsProps } from "./IDialog";

const Dialog: FunctionComponent<DialogsProps> = (props) => {
  // dispatch props
  const {
    open,
    setOpen,
    Dialog_Title,
    Dialog_Content,
    Dialog_Actions,
    maxWidth,
    Dialog_Title_sx,
    Dialog_Content_sx,
    Dialog_Actions_sx,
    sx,
    fullWidth,
    dividers,
    scroll,
    dialogClassName,
    dialogTitleClassName,
    dialogContentClassName,
    dialogActionClassName,
    fullScreen,
    onKeyDown,
  } = props;

  // Responsive full screen
  const theme = useTheme();
  const responsivefullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialogs
      onKeyDown={onKeyDown}
      fullScreen={fullScreen && responsivefullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open ?? false}
      onClose={() => !!setOpen && setOpen(false)}
      scroll={scroll}
      sx={sx}
      slotProps={{
        paper: {
          className: `dialogClassName ${dialogClassName}`,
        },
      }}
    >
      {Dialog_Title && (
        <DialogTitle
          className={`dialogTitleClassName ${dialogTitleClassName}`}
          sx={Dialog_Title_sx}
        >
          {Dialog_Title}{" "}
        </DialogTitle>
      )}
      {Dialog_Content && (
        <DialogContent
          className={`dialogContentClassName ${dialogContentClassName}`}
          dividers={dividers}
          sx={{
            ...Dialog_Content_sx,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {Dialog_Content}
        </DialogContent>
      )}
      {Dialog_Actions && (
        <DialogActions
          className={`dialogActionClassName ${dialogActionClassName}`}
          sx={{ ...Dialog_Actions_sx, justifyContent: "center" }}
        >
          {Dialog_Actions}
        </DialogActions>
      )}
    </Dialogs>
  );
};

export default Dialog;
