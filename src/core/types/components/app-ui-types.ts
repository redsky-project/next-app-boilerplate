import { type ComponentType, type ReactNode } from 'react';
import { type Root } from 'react-dom/client';

export interface IUI {
	//alert: TAlertDialog;
	//confirm: TConfirmDialog;
	dialog: TDialog;
}

// $ui - Dialog 컴포넌트 types ---------------------------------------
export type TDialog = <T = any>(options: IDialogOptions<T>) => IDialogInstance;
export interface IDialogOptions<T = any> {
	component: ComponentType<T & IDialogComponentProps>;
	props?: Omit<T, keyof IDialogComponentProps>;
	title?: ReactNode;
	description?: ReactNode;
	className?: string;
	showCloseButton?: boolean;
	onConfirm?: (data?: any) => void;
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
