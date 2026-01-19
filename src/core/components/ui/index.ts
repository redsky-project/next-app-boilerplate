import { TAlert, TDialog } from '@app-types/components';
import { alert } from '@/core/components/ui/dialog/alert-service.tsx';
import { dialog } from '@/core/components/ui/dialog/dialog-service.tsx';

export function setUiService() {
	const ui = {
		alert: alert as TAlert,
		//confirm: confirm as any, // TConfirm,
		dialog: dialog as TDialog,
	};
	return ui;
}
