import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SendHorizonalIcon } from "lucide-react"

export function InputWithButton({ className = '', onClick }: { className?: string, onClick?: () => void }) {
    // TODO: Buton ikonu değişebilir.
    return (
        <div className={cn('flex gap-2', className)}>
            <Input type='text' placeholder='Sic mundus creatus est...' />
            <Button onClick={onClick} type='submit' variant='outline'>
                <SendHorizonalIcon />
            </Button>
        </div>
    )
}
