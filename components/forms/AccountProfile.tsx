'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface AccountProfileProps {
	user: {
		id: string;
		objectId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}
const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			profile_photo: '',
			name: '',
			username: '',
			bio: '',
		},
	});

	function handleImage(e: ChangeEvent, fieldChange: (value: string) => void) {
		e.preventDefault();
	}

	function onSubmit(values: z.infer<typeof UserValidation>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-start gap-10'>
				{/* Profile Photo */}
				<FormField
					control={form.control}
					name='profile_photo'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='account-form_image-label'>
								{field.value ? (
									<Image src={field.value} alt='profile photo' width={96} height={96} priority className='rounded-full object-contain' />
								) : (
									<Image src='/assets/profile.svg' alt='profile photo' width={32} height={32} className='object-contain' />
								)}
							</FormLabel>
							<FormControl className='flex-1 text-base-semibold text-gray-200'>
								<Input
									placeholder='Upload a photo'
									type='file'
									accept='image/*'
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Name */}
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Name</FormLabel>
							<FormControl>
								<Input placeholder='Your first name' type='text' className='account-form_input no-focus' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Username */}
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Userame</FormLabel>
							<FormControl>
								<Input placeholder='Your username' type='text' className='account-form_input no-focus' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Bio */}
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Bio</FormLabel>
							<FormControl>
								<Textarea rows={10} placeholder='Your bio' className='account-form_input no-focus' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type='submit' className='bg-primary-500'>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;
