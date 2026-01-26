'use client';

import { Button } from '@/core/components/shadcn/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/core/components/shadcn/ui/dropdown-menu';

interface ActionButtonsProps {
	onView?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
}

export function ActionButtons({ onView, onEdit, onDelete }: ActionButtonsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					⋮
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{onView && <DropdownMenuItem onClick={onView}>View details</DropdownMenuItem>}
				{onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
				{onDelete && (
					<DropdownMenuItem onClick={onDelete} className="text-destructive">
						Delete
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
