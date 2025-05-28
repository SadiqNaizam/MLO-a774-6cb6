import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Zod schema for form validation
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  onNavigateToSignUp?: () => void; // For handling sign-up navigation in SPA context
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess, onNavigateToSignUp }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log("Login form submitted:", data);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // Assuming login is successful for the demo
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
      // Optionally, reset the form: form.reset();
    } catch (error) {
      console.error("Login failed:", error);
      // Example: Display a server-side error message
      // form.setError("root.serverError", { type: "manual", message: "Invalid username or password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateToSignUp) {
      event.preventDefault(); // Prevent default browser navigation if handler is provided
      onNavigateToSignUp();
    }
    // If onNavigateToSignUp is not provided, the link will navigate via href
  };

  return (
    <div className={cn("w-full", className)}>
      <h1 className="text-3xl font-bold text-card-foreground mb-6 text-left">
        Log in
      </h1>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-card-foreground">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            {...form.register("username")}
            className={cn(
              "bg-card text-card-foreground border-input placeholder:text-muted-foreground",
              form.formState.errors.username && "border-destructive focus-visible:ring-destructive"
            )}
            disabled={isLoading}
            aria-invalid={form.formState.errors.username ? "true" : "false"}
          />
          {form.formState.errors.username && (
            <p className="text-sm font-medium text-destructive pt-1">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...form.register("password")}
            className={cn(
              "bg-card text-card-foreground border-input placeholder:text-muted-foreground",
              form.formState.errors.password && "border-destructive focus-visible:ring-destructive"
            )}
            disabled={isLoading}
            aria-invalid={form.formState.errors.password ? "true" : "false"}
          />
          {form.formState.errors.password && (
            <p className="text-sm font-medium text-destructive pt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        
        {/* Uncomment to display a general server-side error message 
        {form.formState.errors.root?.serverError && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.root.serverError.message}
          </p>
        )}
        */}

        <Button
          type="submit"
          variant="default" 
          className="w-full text-base font-semibold h-12" 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          or,{' '}
          <a 
            href="/signup" // Fallback href, or use router Link component if using React Router
            onClick={handleSignUpClick}
            className="font-medium text-primary hover:text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
          >
            sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
