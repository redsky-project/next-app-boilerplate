import { useEffect, useState } from 'react';
import type { IConfirmOptions, IConfirmResult, IConfirmControl } from '@app-types/components';
import { createRoot, type Root } from 'react-dom/client';
import ConfirmWrapper from '@components/ui/dialog/ConfirmWrapper';

class ConfirmService {
	private activeConfirms: Map<string, { root: Root; container: HTMLDivElement }> = new Map();

	private createConfirmContainer(): HTMLDivElement {
		const container = document.createElement('div');
		document.body.appendChild(container);
		return container;
	}

	private removeConfirmContainer(container: HTMLDivElement): void {
		if (container.parentNode) {
			container.parentNode.removeChild(container);
		}
	}

	public open(message: string, options?: IConfirmOptions): IConfirmControl {
		const id = `confirm-${Date.now()}-${Math.random()}`;
		const container = this.createConfirmContainer();
		const root = createRoot(container);

		let closeCallback: (() => void) | null = null;

		const promise = new Promise<IConfirmResult>((resolve) => {
			const cleanup = () => {
				this.activeConfirms.delete(id);
				root.unmount();
				this.removeConfirmContainer(container);
			};

			const ConfirmContainer = () => {
				const [open, setOpen] = useState(true);

				const handleClose = () => {
					setOpen(false);
					setTimeout(() => {
						resolve({ action: 'close' });
						cleanup();
					}, 200);
				};

				const handleConfirm = () => {
					//options.onConfirm?.(data);
					setOpen(false);
					setTimeout(() => {
						resolve({ action: 'confirm' });
						cleanup();
					}, 200);
				};

				const handleCancel = (data?: any) => {
					//options.onCancel?.(data);
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
					<ConfirmWrapper
						open={open}
						handleClose={handleClose}
						handleConfirm={handleConfirm}
						handleCancel={handleCancel}
						options={options}
						message={message}
					/>
				);
			};

			root.render(<ConfirmContainer />);
			this.activeConfirms.set(id, {
				root,
				container,
			});
		});

		return {
			promise,
			close: () => {
				closeCallback?.();
			},
		};
	}
}

// $ui.alert() 으로 사용할 함수
export const confirm = (message: string, options?: IConfirmOptions): IConfirmControl => {
	const _inst = new ConfirmService();

	return _inst.open(message, options);
};
