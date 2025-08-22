import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Route as NotesRoute } from '@/routes/notes/$noteIdOrNew'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'

export const EmptyNoteCard = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <Link to={NotesRoute.to} params={{ noteIdOrNew: 'new' }} aria-label="Yeni not oluştur">
            <Card className={cn("w-36 h-40 flex items-center justify-center p-6 border-dashed border-2 border-gray-300 hover:bg-gray-50 transition rounded", className)} {...props}>
                <CardContent className="flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-sm text-nowrap text-gray-600">Yeni not</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}