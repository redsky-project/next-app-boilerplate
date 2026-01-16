'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/core/components/shadcn/ui/dialog';
import { useLockBodyScroll } from '@hooks/useLockBodyScroll';

export interface IInterceptModalProps {
	options: any;
	children?: React.ReactNode;
}

export default function InterceptModal({ options, children }: IInterceptModalProps) {
	const router = useRouter();
	const [open, setOpen] = useState(true);

	// 모달이 열릴 때 배경 스크롤 방지
	useLockBodyScroll();

	const handleClose = () => {
		setOpen(false);
		// Dialog 닫힘 애니메이션 후 정리
		setTimeout(() => {
			router.back();
		}, 200);
	};

	const handleConfirm = (data?: any) => {
		options?.props?.onConfirm?.(data);
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => !isOpen && handleClose()}
			modal={true}
		>
			<DialogContent className={options?.className}>
				{(options?.title || options?.description) && (
					<DialogHeader>
						{options?.title && <DialogTitle>{options.title}</DialogTitle>}
						{options?.description && <DialogDescription>{options.description}</DialogDescription>}
					</DialogHeader>
				)}
				{options?.component && (
					<options.component
						{...(options.props || {})}
						onClose={handleClose}
						onConfirm={handleConfirm}
					/>
				)}
				{children}
			</DialogContent>
		</Dialog>
	);
}
