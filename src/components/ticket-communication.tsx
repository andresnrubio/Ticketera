'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Comment as CommentType, type Agent } from '@/lib/types';
import { Send, MessageSquare, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { agents } from '@/lib/data';

export function TicketCommunication({ initialComments }: { initialComments: CommentType[] }) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'Reply' | 'Note'>('Reply');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const currentUser: Agent = agents[0]; // Mock current user
    const comment: CommentType = {
      id: `comment-${comments.length + 3}`,
      author: currentUser,
      content: newComment,
      timestamp: new Date().toISOString(),
      type: activeTab,
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  const renderComments = (type: 'Reply' | 'Note') => {
    return comments
      .filter((c) => c.type === type)
      .map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{comment.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {format(parseISO(comment.timestamp), 'PPp')}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">{comment.content}</p>
          </div>
        </div>
      ));
  };

  return (
    <Tabs defaultValue="Reply" onValueChange={(value) => setActiveTab(value as 'Reply' | 'Note')} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Reply"><MessageSquare className="mr-2 h-4 w-4" /> Public Reply</TabsTrigger>
        <TabsTrigger value="Note"><Users className="mr-2 h-4 w-4" /> Internal Note</TabsTrigger>
      </TabsList>
      <TabsContent value="Reply">
        <div className="space-y-4">
          {renderComments('Reply')}
        </div>
      </TabsContent>
      <TabsContent value="Note">
        <div className="space-y-4">
          {renderComments('Note')}
        </div>
      </TabsContent>
      <div className="mt-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={`Add a ${activeTab === 'Reply' ? 'public reply' : 'private note'}...`}
          className="min-h-[100px]"
        />
        <Button onClick={handleAddComment} className="mt-2 float-right">
          <Send className="mr-2 h-4 w-4" />
          Add {activeTab}
        </Button>
      </div>
    </Tabs>
  );
}
