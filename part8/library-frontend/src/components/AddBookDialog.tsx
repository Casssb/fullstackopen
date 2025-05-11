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
import { CREATE_BOOK } from '@/mutations';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS_BY_AUTHOR_BY_GENRE } from '@/queries';
import { useState } from 'react';

const addBookSchema = z.object({
  author: z
    .string()
    .min(2, { message: 'Author name must be at least 2 characters.' }),
  title: z
    .string()
    .min(2, { message: 'Book title must be at least 2 characters.' }),
  published: z.coerce.number(),
});

const BookDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addBookSchema>>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      author: '',
      title: '',
      published: 1970,
    },
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ALL_BOOKS_BY_AUTHOR_BY_GENRE, ALL_AUTHORS],
  });

  const onSubmit = (values: z.infer<typeof addBookSchema>) => {
    const { author, title, published } = values;

    createBook({ variables: { title, published, author } });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
          <DialogDescription>
            Fill in the required information and then click 'Confirm' to add a
            book
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the author
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year published</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Enter year published</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Some title" {...field} />
                  </FormControl>
                  <FormDescription>Enter the title of the book</FormDescription>
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

export default BookDialog;
