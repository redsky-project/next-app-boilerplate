import { useEffect, useState } from 'react';
import type { IAlertOptions, IAlertResult, IAlertControl } from '@app-types/components';
import { createRoot, type Root } from 'react-dom/client';
import AlertWrapper from '@components/ui/dialog/AlertWrapper';

class AlertService {
	private activeAlerts: Map<string, { root: Root; container: HTMLDivElement; }> =
		new Map();

	private createAlertContainer(): HTMLDivElement {
		const container = document.createElement('div');
		document.body.appendChild(container);
		return container;
	}

	private removeAlertContainer(container: HTMLDivElement): void {
		if (container.parentNode) {
			container.parentNode.removeChild(container);
		}
	}

	public open(message: string, options?: IAlertOptions): IAlertControl {
		const id = `alert-${Date.now()}-${Math.random()}`;
		const container = this.createAlertContainer();
		const root = createRoot(container);

		let closeCallback: (() => void) | null = null;

		const promise = new Promise<IAlertResult>((resolve) => {
			const cleanup = () => {
				this.activeAlerts.delete(id);
				root.unmount();
				this.removeAlertContainer(container);
			};

			const AlertContainer = () => {
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

				// closeCallback 설정
				useEffect(() => {
					closeCallback = handleClose;
				}, []);

				return (
					<AlertWrapper
						open={open}
						handleClose={handleClose}
						handleConfirm={handleConfirm}
						options={options}
						message={message}
					/>
				);
			};

			root.render(<AlertContainer />);
			this.activeAlerts.set(id, {
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
export const alert = (message: string, options?: IAlertOptions): IAlertControl => {
	const _inst = new AlertService();

	return _inst.open(message, options);
};
