export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen bokeh-bg overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        {children}
      </div>
    </div>
  );
}
