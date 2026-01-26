'use client';

import { Badge } from '@/core/components/shadcn/ui/badge';
import type { UserStatus } from '@/app/(domains)/example/_types/data-table';

interface StatusBadgeProps {
	status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const variants = {
		active: 'default',
		inactive: 'secondary',
		pending: 'outline',
	} as const;

	const labels = {
		active: 'Active',
		inactive: 'Inactive',
		pending: 'Pending',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
