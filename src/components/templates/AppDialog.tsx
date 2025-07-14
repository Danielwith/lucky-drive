/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ModalDialogTypes } from "@/lib/types/types";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ReactNode, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

type RenderProps = {
  close: () => void;
};

type Props = Omit<ModalDialogTypes.props, "children"> & {
  /**
   * Si 'children' es función la llamamos con { close },
   * si es ReactNode lo renderizamos directamente.
   */
  children: ReactNode | ((args: RenderProps) => ReactNode);
};

export function ModalDialog({
  trigger,
  children,
  exitButton = true,
  customStyles,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen! : uncontrolledOpen;
  const setOpen = isControlled
    ? controlledOnOpenChange!
    : (v: boolean) => setUncontrolledOpen(v);

  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <VisuallyHidden asChild className="hidden">
        <DialogTitle>Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        aria-describedby=""
        className={`w-auto ${customStyles ?? ""}`}
        exitButton={exitButton}
      >
        {typeof children === "function"
          ? (children as (args: RenderProps) => ReactNode)({ close })
          : children}
      </DialogContent>
    </Dialog>
  );
}
