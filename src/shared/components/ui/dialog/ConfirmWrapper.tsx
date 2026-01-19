'use client';

import type { IConfirmOptions } from '@app-types/components';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/core/components/shadcn/ui/dialog';
import { Button } from '@/core/components/shadcn/ui/button';

export interface IConfirmWrapperProps {
	open: boolean;
	handleClose: () => void;
	handleCancel: (data?: any) => void;
	handleConfirm: (data?: any) => void;
	message: string;
	options?: IConfirmOptions;
	children?: React.ReactNode;
}

export default function ConfirmWrapper({
	open,
	handleClose,
	handleCancel,
	handleConfirm,
	message,
	options,
	children,
}: IConfirmWrapperProps) {
	const opts = options || {};
	const description = opts.description !== undefined ? (<DialogDescription>{opts.description}</DialogDescription>) : null;
	const Content = message ? (
		message
	) : (
		children
	);

	return (
		<Dialog
			open={open}
			modal={true}
			onOpenChange={(isOpen) => !isOpen && handleClose()}
		>
			<DialogContent className={opts.className || ''}
aria-describedby={opts.description ? 'alert-description' : ''}>
				<DialogHeader>
					{/*<DialogTitle className={opts.title ? '' : 'sr-only'}>*/}
					<DialogTitle>
						{opts.title || '알림'}
					</DialogTitle>
					{description}
				</DialogHeader>
				{Content}
				<DialogFooter>
					<Button
						variant="outline"
						onClick={handleCancel}
					>
						{opts.cancelText || '취소'}
					</Button>
					<Button onClick={handleConfirm}>{opts.confirmText || '확인'}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
