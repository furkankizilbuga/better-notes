import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  // TODO: ScrollArea. Sayfanın tamamı scrollanmamalı. İçerisindeki bölümler scrollanmalı
  return (
    <div className={cn('container w-full max-w-4xl mx-auto px-4', className)}>
      {children}
    </div>
  )
}
