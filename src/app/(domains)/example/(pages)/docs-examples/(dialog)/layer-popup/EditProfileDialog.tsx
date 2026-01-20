import type { JSX } from 'react';

import { Button } from '@components/ui';
import { Input } from '@/core/components/shadcn/ui/input';

interface IEditProfileDialogProps {
	onClose: () => void;
	onCancel: (data?: any) => void;
	onConfirm: (data?: any) => void;
}

export default function EditProfileDialog({ onClose, onCancel, onConfirm }: IEditProfileDialogProps): JSX.Element {
	const handlerClose = () => {
		onClose();
	};

	//const handlerCancel = () => {
	//	onCancel?.('22222222');
	//};

	//const handlerConfirm = () => {
	//	onConfirm?.('33333333');
	//};

	return (
		<>
			<div className="space-y-4">
				<div className="space-y-2 max-h-80 overflow-y-auto">
					<div className="grid gap-4">
						<div className="grid gap-3">
							<label htmlFor="name-1">Name</label>
							<Input
								id="name-1"
								name="name"
								defaultValue="홍길동"
							/>
						</div>
						<div className="grid gap-3">
							<label htmlFor="username-1">Username</label>
							<Input
								id="username-1"
								name="username"
								defaultValue="@hong"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<Button onClick={handlerClose}>닫기</Button>
				</div>
			</div>
		</>
	);
}
