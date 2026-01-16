import { useEffect, useState } from 'react';
import type { IDialogOptions, IDialogResult, IDialogControl, IDialogComponentProps } from '@app-types/components';
import { createRoot, type Root } from 'react-dom/client';
import DialogWrapper from '@components/ui/dialog/DialogWrapper';

class DialogService {
	private activeDialogs: Map<string, { root: Root; container: HTMLDivElement; updateProps: (newProps: any) => void }> =
		new Map();

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

	public dialog<P = any>(options: IDialogOptions<P>): IDialogControl<P> {
		const id = `dialog-${Date.now()}-${Math.random()}`;
		const container = this.createDialogContainer();
		const root = createRoot(container);

		let updatePropsCallback: ((newProps: Partial<Omit<P, keyof IDialogComponentProps>>) => void) | null = null;
		let closeCallback: (() => void) | null = null;

		const promise = new Promise<IDialogResult>((resolve) => {
			const cleanup = () => {
				this.activeDialogs.delete(id);
				root.unmount();
				this.removeDialogContainer(container);
			};

			const DialogContainer = () => {
				const [open, setOpen] = useState(true);
				const [currentProps, setCurrentProps] = useState<Omit<P, keyof IDialogComponentProps>>(
					options.props || ({} as any),
				);

				// updatePropsCallback 설정
				useEffect(() => {
					updatePropsCallback = (newProps: Partial<Omit<P, keyof IDialogComponentProps>>) => {
						setCurrentProps((prev) => ({ ...prev, ...newProps }));
					};
				}, []);

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

				// closeCallback 설정
				useEffect(() => {
					closeCallback = handleClose;
				}, []);

				return (
					<DialogWrapper<P>
						open={open}
						handleClose={handleClose}
						handleConfirm={handleConfirm}
						handleCancel={handleCancel}
						options={{ ...options, props: currentProps }}
					/>
				);
			};

			root.render(<DialogContainer />);
			this.activeDialogs.set(id, {
				root,
				container,
				updateProps: (newProps) => updatePropsCallback?.(newProps),
			});
		});

		return {
			promise,
			update: (newProps: Partial<Omit<P, keyof IDialogComponentProps>>) => {
				const dialog = this.activeDialogs.get(id);
				if (dialog) {
					dialog.updateProps(newProps);
				}
			},
			close: () => {
				closeCallback?.();
			},
		};
	}
}

// $ui.dialog() 으로 사용할 함수
export const dialog = <P = any,>(option: IDialogOptions<P>): IDialogControl<P> => {
	const _inst = new DialogService();

	return _inst.dialog<P>(option);
};
