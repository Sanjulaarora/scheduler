'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver} from '@hookform/resolvers/zod';
import { usernameSchema } from '@/app/lib/validator';

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  const {register, handleSubmit, setValue, formState: { errors }} = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);

  const onSubmit = async(data) => {

  };

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome, {user?.firstName}
          </CardTitle>
        </CardHeader>
        {/* Latest Updates */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Your Unique Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <div className='flex items-center gap-2'>
                <span>{window?.location.origin}/</span>
                <Input {...register('username')} placeholder='username' />
              </div>
            
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <Button type='submit'>Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard;