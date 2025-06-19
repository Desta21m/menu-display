'use client'
export default function ThemeWrapper({
  theme,
  children
}: {
  theme: { primary: string; secondary: string }
  children: React.ReactNode
}) {
  return (
    <div 
      className="min-h-screen"
      style={{
        '--primary': theme.primary,
        '--secondary': theme.secondary
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}