'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { getAiSuggestions } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

export function AiSuggestions({ ticketContent }: { ticketContent: string }) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSuggest = () => {
    startTransition(async () => {
      const result = await getAiSuggestions(ticketContent);
      setSuggestions(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-500" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 && !isPending && (
          <div className="text-center text-sm text-muted-foreground space-y-4">
            <p>Click the button to get AI-powered article suggestions to help resolve this ticket.</p>
            <Button onClick={handleSuggest} disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Suggest Articles
            </Button>
          </div>
        )}
        {isPending && (
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        )}
        {suggestions.length > 0 && !isPending && (
          <ul className="list-disc list-inside space-y-2 text-sm">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
