import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import React from 'react'

export const UpdateAvailability = () => {
  return (
    <Button variant={'cta'}>
      <Calendar className="shrink-0 size-6" /> <span>Update Availability</span>
    </Button>
  );
}
