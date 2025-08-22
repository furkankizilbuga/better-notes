import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SendHorizonalIcon } from "lucide-react"
import type { ChangeEvent } from "react"

export function InputWithButton({ className = '', onChange, onClick, value }: { className?: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void, onClick?: () => void, value?: string }) {
    // TODO: Buton ikonu değişebilir.
    return (
        <div className={cn('flex gap-2', className)}>
            <Input onChange={onChange} value={value} type='text' placeholder='Type to create a note!' />
            <Button onClick={onClick} type='submit' variant='outline'>
                <SendHorizonalIcon />
            </Button>
        </div>
    )
}
