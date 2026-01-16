import type { IDialogOptions } from '@app-types/components';
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
}

export default function DialogWrapper<P = any>({
	open,
	handleClose,
	handleConfirm,
	handleCancel,
	options,
}: IDialogWrapperProps<P>) {
	const currentProps = options.props || ({} as P);
	const Component = options.component;

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => !isOpen && handleCancel()}
		>
			<DialogContent className={options.className}>
				{(options.title || options.description) && (
					<DialogHeader>
						{options.title && <DialogTitle>{options.title}</DialogTitle>}
						{options.description && <DialogDescription>{options.description}</DialogDescription>}
					</DialogHeader>
				)}

				<Component
					{...(currentProps as P)}
					onClose={handleClose}
					onConfirm={handleConfirm}
				/>
			</DialogContent>
		</Dialog>
	);
}
