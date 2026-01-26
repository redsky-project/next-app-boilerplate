'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/shadcn/ui/avatar';

interface UserAvatarProps {
	name: string;
	email: string;
	avatar?: string;
}

export function UserAvatar({ name, email, avatar }: UserAvatarProps) {
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	return (
		<div className="flex items-center gap-3">
			<Avatar className="h-9 w-9">
				<AvatarImage src={avatar} alt={name} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<span className="text-sm font-medium">{name}</span>
				<span className="text-xs text-muted-foreground">{email}</span>
			</div>
		</div>
	);
}
