'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Paperclip, Send, X } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { RichTextEditor } from './rich-text-editor';

const formSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters.'),
  customerEmail: z.string().email('Invalid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
});

type Attachment = {
  file: File;
  preview: string;
};

export function NewTicketForm() {
  const { toast } = useToast();
  const [attachments, setAttachments] = React.useState<Attachment[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      subject: '',
      description: '',
      priority: 'Medium',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, attachments: attachments.map(a => a.file) });
    toast({
      title: 'Ticket Created!',
      description: 'Your new support ticket has been successfully created.',
    });
    form.reset();
    setAttachments([]);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      const removed = newAttachments.splice(index, 1);
      URL.revokeObjectURL(removed[0].preview);
      return newAttachments;
    });
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  React.useEffect(() => {
    return () => {
      attachments.forEach(attachment => URL.revokeObjectURL(attachment.preview));
    };
  }, [attachments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Support Ticket</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What is the issue about?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Please describe the issue in detail..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                    accept="image/*,application/pdf"
                  />
                  <Button type="button" variant="outline" onClick={handleAttachmentClick}>
                    <Paperclip className="mr-2 h-4 w-4" />
                    Add Files
                  </Button>
                </>
              </FormControl>
              {attachments.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="relative group">
                      {attachment.file.type.startsWith('image/') ? (
                        <Image
                          src={attachment.preview}
                          alt={attachment.file.name}
                          width={150}
                          height={150}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-24 flex flex-col items-center justify-center bg-muted rounded-md p-2">
                            <Paperclip className="h-8 w-8 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground text-center truncate w-full mt-1">{attachment.file.name}</p>
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </FormItem>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              <Send className="mr-2 h-4 w-4" />
              Submit Ticket
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
