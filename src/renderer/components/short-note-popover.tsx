import { Edit2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type TProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
};

export const ShortNotePopover = ({ open, onOpenChange, children }: TProps) => {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger>
                <Edit2 size={20} />
            </PopoverTrigger>
            <PopoverContent side="left">
                {children}
            </PopoverContent>
        </Popover>
    );
};
