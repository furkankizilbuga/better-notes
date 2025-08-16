import { NoteCard } from '@/components/note-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { TypographyH1 } from '@/components/ui/typography-h1'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Container className='flex flex-col gap-4 justify-center items-center h-full'>
            
            <Container className='flex flex-col gap-4 items-center'>
                <TypographyH1>Better Notes</TypographyH1>
                <Link to='/notes' className='max-w-52 w-full'>
                    <Button className='w-full' size={'lg'}>Yaz</Button>
                </Link>
                <Link to='/short-notes' className='max-w-52 w-full'>
                    <Button className='w-full' size={'lg'}>Kısa</Button>
                </Link>
            </Container>
            
            <Separator></Separator>
            
            <Container className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <NoteCard />
                <NoteCard />
                <NoteCard />
            </Container>

        </Container>
    )
}
