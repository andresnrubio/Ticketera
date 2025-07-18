import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
            <Logo />
            <h1 className="text-2xl font-bold mt-2">Ticket AG</h1>
            <p className="text-muted-foreground">Welcome back! Please sign in.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
