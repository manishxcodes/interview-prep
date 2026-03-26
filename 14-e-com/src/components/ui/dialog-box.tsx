import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export type DialogType = "clear" | "remove" | "buy" | null;

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "error" | "success" | "primary" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "primary",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth={"xs"}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle fontWeight={700}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
