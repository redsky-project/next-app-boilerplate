'use client';

import { useState, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useLockBodyScroll } from '@hooks/useLockBodyScroll';
import DialogWrapper from '@/shared/components/ui/dialog/DialogWrapper';

export interface IPostDetailModalProps {
	data: any;
}

export default function PostDetailModal({ data }: IPostDetailModalProps): JSX.Element {
	console.log('>>>>>>>>>>>>>> data::', data);
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(true);

	// 모달이 열릴 때 배경 스크롤 방지
	useLockBodyScroll();

	const handleClose = () => {
		setOpen(false);
		// Dialog 닫힘 애니메이션 후 정리
		setTimeout(() => {
			router.back();
		}, 200);
	};

	return (
		<DialogWrapper
			open={open}
			handleClose={handleClose}
			handleConfirm={() => {}}
			handleCancel={() => {}}
			options={{
				title: '상세 팝업',
			}}
		>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</DialogWrapper>
	);
}
