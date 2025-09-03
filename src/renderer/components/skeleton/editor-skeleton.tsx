import { Skeleton } from "../ui/skeleton"

const EditorSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-2/3 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6 mb-2" />
            <Skeleton className="h-6 w-4/6 mb-2" />
            <Skeleton className="h-6 w-3/6" />
        </div>
    )
}

export default EditorSkeleton;