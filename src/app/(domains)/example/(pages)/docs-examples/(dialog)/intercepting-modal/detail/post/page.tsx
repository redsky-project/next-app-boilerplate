import { JSX } from 'react';

export interface IPostModalPageProps {
	//
}

export default function PostModalPage({}: IPostModalPageProps): JSX.Element {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8">
				<h1 className="text-xl font-semibold">Post Modal기본!!</h1>
			</div>
		</div>
	);
}
