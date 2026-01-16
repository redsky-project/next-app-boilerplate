'use client';

import type { IDialogOptions } from '@app-types/components';
import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/core/components/shadcn/ui/dialog';

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
	const [currentProps, setCurrentProps] = useState<P>(options.props as P);
	const Component = options.component;

	const Content = Component ? (
		<Component
			{...(currentProps as P)}
			onClose={handleCancel}
			onConfirm={handleConfirm}
		/>
	) : (
		children
	);

	useEffect(() => {
		console.log('>>>>>>>>>>>>>> DialogWrapper Props::', options.props);
		setCurrentProps(options.props as P);
	}, [options.props]);

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
			</DialogContent>
		</Dialog>
	);
}
