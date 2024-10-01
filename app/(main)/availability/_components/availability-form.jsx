'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { availabilitySchema } from '@/app/lib/validator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { timeSlots } from '../data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AvailabilityForm = ({initialData}) => {

 const { register, handleSubmit, control, setValue, watch, formState: {errors} } = useForm({
       resolver: zodResolver(availabilitySchema),
       defaultValues: { ...initialData },
   });

  return (
        <form>
            {[
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ].map((day) => {

                const isAvailable = watch(`${day}.isAvailable`);
                return(
                    <div key={day} className='flex items-center space-x-4 mb-4'> 
                        <Controller 
                          name={`${day}.isAvailable`}
                          control={control}
                          render={({ field }) => {
                                return (
                                <Checkbox 
                                    checked={field.value} 
                                    onChecked={(checked) => {
                                      setValue(`${day}.isAvailable`, checked);
                                      if(!checked) {
                                        setValue(`${day}.startTime`, '09:00');
                                        setValue(`${day}.endTime`, '17:00');
                                      }
                                    }}
                                /> 
                                );
                            }}
                        />
                        <span className='w-24'>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>

                        {isAvailable && (
                            <>
                               <Controller 
                                    name={`${day}.startTime`}
                                    control={control}
                                    render={({ field }) => 
                                    {
                                        return (
                                            <Select
                                                onValueChange = {field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className='w-32'>
                                                <SelectValue placeholder='Start Time'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                {timeSlots.map(time => {
                                                    return (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    );
                                                })}                                                    
                                                </SelectContent>
                                            </Select>
                                        );
                                    }}
                                />
                                <span>to</span>
                                <Controller 
                                    name={`${day}.endTime`}
                                    control={control}
                                    render={({ field }) => 
                                    {
                                        return (
                                            <Select
                                               onValueChange = {field.onChange}
                                               value={field.value}
                                            >
                                                <SelectTrigger className='w-32'>
                                                <SelectValue placeholder='End Time'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                {timeSlots.map(time => {
                                                    return (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    );
                                                })}                                                    
                                                </SelectContent>
                                            </Select>
                                        );
                                    }}
                                />
                                {errors[day]?.endTime && (
                                    <span className='text-red-500 text-sm ml-2'>
                                        {errors[day].endTime.message}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                )
            })}
            <div className='flex items-center space-x-4'>
                <span className='w-48'>Minimum gap between bookings (minute): </span>
                <Input
                  type='number'
                  {...register('timeGap', {
                    valueAsNumber: true,
                  })}
                  className='w-32'
                />
                {errors?.timeGap && (
                    <span className='text-red-500 text-sm ml-2'>
                        {errors[day].timeGap.message}
                    </span>
                )}
            </div>
            <Button type='submit' className='mt-5'>
                Update Availability
            </Button>
        </form>
  )
}

export default AvailabilityForm;