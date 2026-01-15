import { JSX } from 'react';

export interface IModalPageProps {
	//
}

export default function ModalPage({}: IModalPageProps): JSX.Element {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 max-w-2xl w-full min-h-[400px]">
				<h1 className="text-xl font-semibold">Post Modal</h1>
			</div>
		</div>
	);
}
