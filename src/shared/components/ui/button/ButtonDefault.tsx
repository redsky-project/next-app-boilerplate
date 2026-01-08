import { Button, buttonVariants } from '@/core/components/shadcn/ui/button';
import { type VariantProps } from 'class-variance-authority';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

interface IButtonDefaultProps extends ButtonProps {
	children?: any;
}

export default function ButtonDefault({ children, ...props }: IButtonDefaultProps): React.ReactNode | any {
	return <Button {...props}>{children}</Button>;
}
