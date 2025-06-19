export default function NotFound({ subdomain }: { subdomain: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">No Menu Found</h1>
      <p className="text-lg">
        {subdomain}.menumaya.com doesn't have an active menu
      </p>
    </div>
  )
}