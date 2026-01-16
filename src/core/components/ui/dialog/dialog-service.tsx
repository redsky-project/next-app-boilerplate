import React from 'react';
import type { IDialogOptions, IDialogResult } from '@app-types/components';
import { createRoot, type Root } from 'react-dom/client';
import DialogWrapper from '@components/ui/dialog/DialogWrapper';

class DialogService {
	private activeDialogs: Map<string, { root: Root; container: HTMLDivElement }> = new Map();

	private createDialogContainer(): HTMLDivElement {
		const container = document.createElement('div');
		document.body.appendChild(container);
		return container;
	}

	private removeDialogContainer(container: HTMLDivElement): void {
		if (container.parentNode) {
			container.parentNode.removeChild(container);
		}
	}

	public dialog<P = any>(options: IDialogOptions<P>): Promise<IDialogResult> {
		return new Promise((resolve) => {
			const id = `dialog-${Date.now()}-${Math.random()}`;
			const container = this.createDialogContainer();
			const root = createRoot(container);

			const cleanup = () => {
				this.activeDialogs.delete(id);
				root.unmount();
				this.removeDialogContainer(container);
			};

			//const Component = options.component;

			const DialogContainer = () => {
				const [open, setOpen] = React.useState(true);

				const handleClose = () => {
					setOpen(false);
					setTimeout(() => {
						resolve({ action: 'close' });
						cleanup();
					}, 200);
				};

				const handleConfirm = (data?: any) => {
					options.onConfirm?.(data);
					setOpen(false);
					setTimeout(() => {
						resolve({ action: 'confirm', data });
						cleanup();
					}, 200);
				};

				const handleCancel = () => {
					setOpen(false);
					setTimeout(() => {
						resolve({ action: 'cancel' });
						cleanup();
					}, 200);
				};

				return (
					<DialogWrapper<P>
						open={open}
						handleClose={handleClose}
						handleConfirm={handleConfirm}
						handleCancel={handleCancel}
						options={options}
					/>
				);
			};

			root.render(<DialogContainer />);
			this.activeDialogs.set(id, { root, container });
		});
	}
}

// $ui.dialog() 으로 사용할 함수
export const dialog = <P = any,>(option: IDialogOptions<P>): Promise<IDialogResult> => {
	const _inst = new DialogService();

	return _inst.dialog<P>(option);
};
