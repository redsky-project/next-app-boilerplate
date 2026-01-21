import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/core/components/shadcn/lib/utils';

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
				// 커스텀 variant 추가 (focus-visible 포함)
				success:
					'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0 dark:focus-visible:ring-green-600 dark:focus-visible:ring-offset-slate-900',
				warning:
					'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-0 dark:focus-visible:ring-amber-500 dark:focus-visible:ring-offset-slate-900',
				info: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 dark:focus-visible:ring-blue-600 dark:focus-visible:ring-offset-slate-900',
				purple:
					'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 dark:focus-visible:ring-purple-600 dark:focus-visible:ring-offset-slate-900',
				pink: 'bg-pink-600 text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-0 dark:focus-visible:ring-pink-600 dark:focus-visible:ring-offset-slate-900',
				indigo:
					'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 dark:focus-visible:ring-indigo-600 dark:focus-visible:ring-offset-slate-900',
				teal: 'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-800 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0 dark:focus-visible:ring-teal-600 dark:focus-visible:ring-offset-slate-900',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				// 커스텀 사이즈 추가 ================================
				xl: 'h-14 px-10 text-lg', // 추가
				'2xl': 'h-16 px-12 text-xl', // 추가
				xs: 'h-8 px-2 text-xs', // 추가
				// 커스텀 사이즈 추가 ================================
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

interface IButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

export default function Button({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	...props
}: IButtonProps): React.JSX.Element {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}
