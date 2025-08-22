import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const NoteCardSkeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <Card className={cn("p-4 bg-white/10 rounded animate-pulse h-40 w-36", className)} {...props}>
            <CardHeader className="px-0">
                <CardTitle className="h-6 bg-gray-300 rounded w-3/4 mb-3"></CardTitle>
                <CardDescription className="h-4 bg-gray-300 rounded w-full mb-2"></CardDescription>
            </CardHeader>
            <CardContent className="h-4 bg-gray-300 rounded w-5/6">
                <p></p>
            </CardContent>
        </Card>
    )
}