import React, { useEffect } from 'react';
import type { IDialogOptions, IDialogInstance } from '@app-types/components';
import { createRoot } from 'react-dom/client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	//DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/core/components/shadcn/ui/dialog';

// Proxy를 사용한 반응형 Props 생성
function createReactiveProps<T extends object>(initialProps: T, onChange: (newProps: T) => void): T {
	return new Proxy(initialProps, {
		set(target, property, value) {
			const oldValue = target[property as keyof T];

			// 값이 실제로 변경된 경우에만 업데이트
			if (oldValue !== value) {
				target[property as keyof T] = value;

				// 변경 사항을 비동기로 통지 (배치 업데이트)
				Promise.resolve().then(() => {
					onChange({ ...target });
				});
			}

			return true;
		},

		get(target, property) {
			const value = target[property as keyof T];

			// 중첩된 객체도 반응형으로 만들기
			if (value && typeof value === 'object' && !Array.isArray(value)) {
				return createReactiveProps(value as any, () => {
					onChange({ ...target });
				});
			}

			return value;
		},
	});
}

class DialogService {
	private activeDialogs: Map<string, IDialogInstance> = new Map();

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

	dialog<T = any>(options: IDialogOptions<T>): IDialogInstance & { props: T } {
		const id = `dialog-${Date.now()}-${Math.random()}`;
		const container = this.createDialogContainer();
		const root = createRoot(container);

		let currentProps = options.props || ({} as T);
		// 상태 업데이트 콜백을 저장할 변수
		let setPropsCallback: ((newProps: any) => void) | null = null;

		const close = () => {
			this.activeDialogs.delete(id);
			root.unmount();
			this.removeDialogContainer(container);
		};

		const update = (newProps: any) => {
			currentProps = { ...currentProps, ...newProps };
			// 콜백이 등록되어 있으면 직접 state 업데이트 (재마운트 방지)
			if (setPropsCallback) {
				setPropsCallback(currentProps);
			} else {
				// 아직 마운트되지 않았으면 초기 렌더링
				renderDialog(currentProps);
			}
		};

		const renderDialog = (propsToRender: any = currentProps) => {
			const Component = options.component;

			const DialogWrapper = () => {
				const [open, setOpen] = React.useState(true);
				const [props, setProps] = React.useState(propsToRender);

				// 컴포넌트 마운트 시 콜백 등록
				useEffect(() => {
					setPropsCallback = (newProps) => {
						setProps(newProps);
					};

					// 언마운트 시 콜백 해제
					return () => {
						setPropsCallback = null;
					};
				}, []);

				const handleClose = () => {
					setOpen(false);
					// Dialog 닫힘 애니메이션 후 정리
					setTimeout(() => {
						close();
					}, 200);
				};

				const handleConfirm = (data?: any) => {
					props.onConfirm?.(data);
					//if (props?.onConfirm) {
					//	props.onConfirm(data);
					//}
					handleClose();
				};

				return (
					<Dialog
						open={open}
						onOpenChange={(isOpen) => !isOpen && handleClose()}
					>
						<DialogContent className={options.className}>
							{(options.title || options.description) && (
								<DialogHeader>
									{options.title && <DialogTitle>{options.title}</DialogTitle>}
									{options.description && <DialogDescription>{options.description}</DialogDescription>}
								</DialogHeader>
							)}

							<Component
								{...(props as T)}
								onClose={handleClose}
								onConfirm={handleConfirm}
							/>
						</DialogContent>
					</Dialog>
				);
			};
			console.log('>>>> root:::', root, root.render);
			root.render(<DialogWrapper />);
		};

		renderDialog();

		// 반응형 props 생성
		const reactiveProps = createReactiveProps(currentProps, (newProps) => {
			update(newProps);
		});

		const instance = {
			root,
			container,
			close,
			update,
			props: reactiveProps as T,
		};

		this.activeDialogs.set(id, instance);
		return instance;
	}
}

// $ui.dialog() 으로 사용할 함수
export const dialog = (option: IDialogOptions) => {
	const _inst = new DialogService();

	return _inst.dialog(option);
};

//export default dialogService;
