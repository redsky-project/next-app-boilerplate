'use client';

import type { IDialogOptions } from '@app-types/components';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/core/components/shadcn/ui/dialog';
import { Button } from '@/core/components/shadcn/ui/button';

export interface IDialogWrapperProps<P = any> {
	open: boolean;
	handleClose: () => void;
	handleConfirm: () => void;
	handleCancel: () => void;
	options: IDialogOptions<P>;
	children?: React.ReactNode;
}

export default function DialogWrapper<P = any>({
	open,
	handleClose,
	handleConfirm,
	handleCancel,
	options,
	children,
}: IDialogWrapperProps<P>) {
	const Component = options.component;

	const Content = Component ? (
		<Component
			{...(options.props as P)}
			onClose={handleClose}
			onCancel={handleCancel}
			onConfirm={handleConfirm}
		/>
	) : (
		children
	);

	return (
		<Dialog
			open={open}
			modal={true}
			onOpenChange={(isOpen) => !isOpen && handleClose()}
		>
			<DialogContent className={options.className}>
				{(options.title || options.description) && (
					<DialogHeader>
						{options.title && <DialogTitle>{options.title}</DialogTitle>}
						{options.description && <DialogDescription>{options.description}</DialogDescription>}
					</DialogHeader>
				)}
				{Content}
				{options.footer && (
					<DialogFooter>
						<Button
							variant="outline"
							onClick={handleCancel}
						>
							{options.footer.cancelText || '취소'}
						</Button>
						<Button onClick={handleConfirm}>{options.footer.confirmText || '확인'}</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
