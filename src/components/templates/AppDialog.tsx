import { ModalDialogTypes } from "@/lib/types/types";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export function ModalDialog({ trigger, children }: ModalDialogTypes.props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>{children}</DialogContent>
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
