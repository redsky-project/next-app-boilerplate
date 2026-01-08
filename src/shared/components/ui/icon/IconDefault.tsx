import { Icons, type IconName } from './registry-icon';
import { type LucideProps } from 'lucide-react';

interface IIconDefaultProps extends LucideProps {
	name: IconName;
}

export default function IconDefault({ name, ...props }: IIconDefaultProps) {
	const IconComponent = Icons[name] as any;

	// 유효한 아이콘 컴포넌트인지 확인하기
	if (!IconComponent || typeof IconComponent !== 'object') {
		console.warn(`[WARNING: next-app-boilerplate] "${String(name)}" is not a valid icon`);
		return null;
	}

	return <IconComponent {...props} />;
}
