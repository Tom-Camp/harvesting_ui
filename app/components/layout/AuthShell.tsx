import logo from "~/assets/logo.svg";

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
}

export function AuthShell({ children, title }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={logo} alt="harvesting.food" className="mx-auto mb-4 h-32 w-auto" />
          <h1 className="text-3xl font-bold text-green-700">harvesting.food</h1>
          <p className="mt-2 text-gray-600">{title}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
