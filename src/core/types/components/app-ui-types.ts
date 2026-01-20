import { type ComponentType, type ReactNode } from 'react';
import { type Root } from 'react-dom/client';

export interface IUI {
	alert: TAlert;
	confirm: TConfirm;
	dialog: TDialog;
}

// $ui - Alert 컴포넌트 types ---------------------------------------
export type TAlert = (message?: ReactNode | string, options?: IAlertOptions) => IAlertControl;

export interface IAlertOptions {
	type?: 'success' | 'info' | 'warning' | 'error';
	title?: ReactNode | string;
	description?: ReactNode | string;
	autoDismiss?: number;
	confirmText?: string;
	className?: string;
	showConfirm?: boolean;
}

export interface IAlertControl {
	promise: Promise<IAlertResult>;
	close: () => void;
}
export interface IAlertResult {
	action: 'confirm' | 'close';
}

// $ui - Confirm 컴포넌트 types ---------------------------------------
export type TConfirm = (message?: ReactNode | string, options?: IConfirmOptions) => IConfirmControl;

export interface IConfirmOptions {
	type?: 'success' | 'info' | 'warning' | 'error';
	title?: ReactNode | string;
	description?: ReactNode | string;
	confirmText?: string;
	cancelText?: string;
	className?: string;
}

export interface IConfirmControl {
	promise: Promise<IConfirmResult>;
	close: () => void;
}
export interface IConfirmResult {
	action: 'confirm' | 'close' | 'cancel';
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
	footer?: {
		confirmText?: string;
		cancelText?: string;
	};
	onConfirm?: (data?: any) => void;
	onCancel?: (data?: any) => void;
}

export interface IDialogComponentProps {
	onClose: () => void;
	onCancel?: (data?: any) => void;
	onConfirm?: (data?: any) => void;
}

export interface IDialogInstance<T = any> {
	root: Root;
	container: HTMLDivElement;
	close: () => void;
	update: (newProps: Partial<T>) => void;
	props?: T; // 반응형 props 객체
}
