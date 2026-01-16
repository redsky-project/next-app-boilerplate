import { TDialog } from '@app-types/components';
import { dialog } from '@/core/components/ui/dialog/dialog-service.tsx';

export function setUiService() {
	const ui = {
		//alert: alert as any, //TAlert,
		//confirm: confirm as any, // TConfirm,
		dialog: dialog as TDialog,
	};
	return ui;
}
