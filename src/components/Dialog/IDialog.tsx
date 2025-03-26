import { SxProps, Theme, useTheme } from "@mui/material/styles";
import { KeyboardEventHandler } from "react";

export interface DialogsProps {
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * Callback fired when the component requests to be closed.
   *
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  Dialog_Title_sx?: SxProps<Theme>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  Dialog_Content_sx?: SxProps<Theme>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  Dialog_Actions_sx?: SxProps<Theme>;
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean;
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth?: Breakpoint | false;
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers?: boolean;
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll?: "body" | "paper";

  Dialog_Title?: string | React.ReactNode;
  Dialog_Content?: JSX.Element;
  Dialog_Actions?: JSX.Element;
  dialogClassName?: string;
  dialogTitleClassName?: string;
  dialogContentClassName?: string;
  dialogActionClassName?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
