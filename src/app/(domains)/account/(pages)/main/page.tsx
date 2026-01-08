import { JSX } from 'react';

interface IAccountMainProps {
	test?: string;
}

export default function AccountMain({}: IAccountMainProps): JSX.Element {
	return (
		<>
			<div>계좌 메인 Page!!</div>
		</>
	);
}
