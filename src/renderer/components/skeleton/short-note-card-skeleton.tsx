import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card"

export const ShortNoteCardSkeleton = () => {
    return (
        <Card className="bg-white/10 rounded animate-pulse">
            <CardHeader>
                <CardTitle className="bg-gray-300 rounded w-3/4 h-6"></CardTitle>
                <CardDescription className='h-4 bg-gray-300 rounded w-full'></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mx-auto h-4 bg-gray-300 rounded"></div>
            </CardContent>
        </Card>
    )
}