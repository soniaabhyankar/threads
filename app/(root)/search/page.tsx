import UserCard from '@/components/cards/UserCard';
import PostThread from '@/components/forms/PostThread';
import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Search = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect('/onboarding');

	// Fetch all users
	const result = await fetchUsers({
		userId: user.id,
		searchString: 'son',
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-10'>Search</h1>

			{/* Search Bar */}

			<div className='mt-14 flex flex-col gap-9'>
				{result.users.length === 0 ? (
					<p className='no-result'>No users found</p>
				) : (
					<>
						{result.users.map((person) => (
							<UserCard
								key={person.id}
								id={person.id}
								name={person.name}
								username={person.username}
								imgUrl={person.image}
								personType='User'
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Search;
