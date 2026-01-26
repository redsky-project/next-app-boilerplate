'use client';

import { useEffect, useState } from 'react';
import { formatDate, formatRelativeTime } from '@/app/(domains)/example/_common';

interface DateCellProps {
	date: string;
	showRelative?: boolean;
}

export function DateCell({ date, showRelative = false }: DateCellProps) {
	const [mounted, setMounted] = useState(false);
	const formattedDate = formatDate(date, 'yyyy-MM-dd HH:mm');

	useEffect(() => {
		setMounted(true);
	}, []);

	const relativeTime = mounted && showRelative ? formatRelativeTime(date) : null;

	return (
		<div className="flex flex-col">
			<span className="text-sm">{formattedDate}</span>
			{relativeTime && <span className="text-xs text-muted-foreground">{relativeTime}</span>}
		</div>
	);
}
