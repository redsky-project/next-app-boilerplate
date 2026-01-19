import { TAlert, TConfirm, TDialog } from '@app-types/components';
import { alert } from '@/core/components/ui/dialog/alert-service.tsx';
import { confirm } from '@/core/components/ui/dialog/confirm-service.tsx';
import { dialog } from '@/core/components/ui/dialog/dialog-service.tsx';

export function setUiService() {
	const ui = {
		alert: alert as TAlert,
		confirm: confirm as TConfirm,
		dialog: dialog as TDialog,
	};
	return ui;
}
