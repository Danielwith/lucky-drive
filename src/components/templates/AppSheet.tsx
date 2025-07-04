import { ModalSheetTypes } from "@/lib/types/types";
import { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type RenderProps = {
  close: () => void;
};

type Props = Omit<ModalSheetTypes.props, "children"> & {
  /**
   * Si 'children' es función la llamamos con { close },
   * si es ReactNode lo renderizamos directamente.
   */
  children: ReactNode | ((args: RenderProps) => ReactNode);
};

export function ModalSheet({
  trigger,
  children,
  exitButton = true,
  customStyles,
}: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className={customStyles} exitButton={exitButton}>
        {typeof children === "function"
          ? (children as (args: RenderProps) => ReactNode)({ close })
          : children}
      </SheetContent>
    </Sheet>
  );
}
