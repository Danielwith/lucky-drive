import { ModalDialogTypes } from "@/lib/types/types";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ReactNode, useState } from "react";

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
}: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`w-auto ${customStyles ?? ""}`}
        exitButton={exitButton}
      >
        {typeof children === "function"
          ? (children as (args: RenderProps) => ReactNode)({ close })
          : children}
      </DialogContent>
    </Dialog>
    // <Dialog>
    //   <ContextMenu>
    //     <ContextMenuTrigger>Right click</ContextMenuTrigger>
    //     <ContextMenuContent>
    //       <ContextMenuItem>Open</ContextMenuItem>
    //       <ContextMenuItem>Download</ContextMenuItem>
    //       <DialogTrigger asChild>
    //         <ContextMenuItem>
    //           <span>Delete</span>
    //         </ContextMenuItem>
    //       </DialogTrigger>
    //     </ContextMenuContent>
    //   </ContextMenu>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Are you absolutely sure?</DialogTitle>
    //       <DialogDescription>
    //         This action cannot be undone. Are you sure you want to permanently
    //         delete this file from our servers?
    //       </DialogDescription>
    //     </DialogHeader>
    //     <DialogFooter>
    //       <Button type="submit">Confirm</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
