import { type ComponentType, type ReactNode } from 'react';
import { type Root } from 'react-dom/client';

export interface IUI {
	//alert: TAlertDialog;
	//confirm: TConfirmDialog;
	dialog: TDialog;
}

// $ui - Dialog 컴포넌트 types ---------------------------------------
export interface IDialogResult<T = any> {
	action: 'confirm' | 'close' | 'cancel';
	data?: T;
}

export type TDialog = <P = any>(options: IDialogOptions<P>) => IDialogControl<P>;

export interface IDialogControl<P = any> {
	promise: Promise<IDialogResult>;
	update: (newProps: Partial<Omit<P, keyof IDialogComponentProps>>) => void;
	close: () => void;
}

export interface IDialogOptions<P = any> {
	component?: ComponentType<P & IDialogComponentProps>;
	props?: Omit<P, keyof IDialogComponentProps>;
	title?: ReactNode | string;
	description?: ReactNode | string;
	className?: string;
	showCloseButton?: boolean;
	footer?: {
		confirmText?: string;
		cancelText?: string;
	};
	onConfirm?: (data?: any) => void;
	onCancel?: (data?: any) => void;
}

export interface IDialogComponentProps {
	onClose: () => void;
	onConfirm?: (data?: any) => void;
}

export interface IDialogInstance<T = any> {
	root: Root;
	container: HTMLDivElement;
	close: () => void;
	update: (newProps: Partial<T>) => void;
	props?: T; // 반응형 props 객체
}
