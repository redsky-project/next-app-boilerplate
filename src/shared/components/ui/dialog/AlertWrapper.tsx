'use client';

import type { IAlertOptions } from '@app-types/components';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/core/components/shadcn/ui/dialog';
import { Button } from '@/core/components/shadcn/ui/button';

export interface IDialogWrapperProps {
	open: boolean;
	handleClose: () => void;
	handleConfirm: (data?: any) => void;
	message: string;
	options?: IAlertOptions;
	children?: React.ReactNode;
}

export default function DialogWrapper({
	open,
	handleClose,
	handleConfirm,
	message,
	options,
	children,
}: IDialogWrapperProps) {
	const opts = options || {};
	const showConfirm = opts.showConfirm !== undefined ? opts.showConfirm : true;
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
				{showConfirm && (
					<DialogFooter>
						<Button onClick={handleConfirm}>{opts.confirmText || '확인'}</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
