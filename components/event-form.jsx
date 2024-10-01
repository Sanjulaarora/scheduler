'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { eventSchema } from '@/app/lib/validator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { createEvent } from '@/actions/events';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

const EventForm = ({ onSubmitForm }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });

  const { loading, error, fn: fnCreateEvent} = useFetch(createEvent);

  const onSubmit = async(data) => {
    await fnCreateEvent(data);
    if(!loading && !error) onSubmitForm();
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <form className="px-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
        >
          Event Title
        </label>
        <Input id='title' {...register('title')} className='mt-1' />
        {errors.title && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Event Description
        </label>
        <Textarea {...register('description')} id='description' className='mt-1' />
        {errors.description && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='duration'
          className='block text-sm font-medium text-gray-700'
        >
          Duration (minutes)
        </label>
        <Input id='duration' {...register('duration',{
          valueAsNumber: true,
        })} 
        type='number'
        className='mt-1' />
        {errors.duration && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.duration.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='isPrivate'
          className='block text-sm font-medium text-gray-700'
        >
          Event Privacy
        </label>
        <Controller name='isPrivate' control={control} 
          render = {({ field }) => (
            <Select onValueChange={(value) => field.onChange(value === 'true')}
            value={field.value? 'true' : 'false'}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.isPrivate && (
          <p className='text-red-500 text-xs mt-1'>
            {errors.isPrivate.message}
          </p>
        )}
      </div>

      {error && <p className='text-red-500 text-xs mt-1'>{error.message}</p>}

      <Button type='submit' disabled={loading}>
        {loading ? 'submitting...' : 'Create Event'}
      </Button>
    </form>
  );
};

export default EventForm;