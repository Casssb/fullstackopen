import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '@/auth';

const addBookSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' }),
  password: z.string(),
});

const LogInOut = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addBookSchema>>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleLogin, handleLogout, isAuthenticated } = useAuth();

  const onSubmit = (values: z.infer<typeof addBookSchema>) => {
    const { username, password } = values;

    handleLogin(username, password);
    setOpen(false);
  };

  return isAuthenticated ? (
    <Button onClick={() => handleLogout()}>Sign Out</Button>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Enter your username and password to sign in
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="...your username" {...field} />
                  </FormControl>
                  <FormDescription>Enter username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LogInOut;
