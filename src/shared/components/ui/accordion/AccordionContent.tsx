'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { AccordionContentProps } from '@radix-ui/react-accordion';
import { useAccordionContext } from '@/core/hooks';

import { cn } from '@/core/components/shadcn/lib/utils';

interface IAccordionContentProps extends AccordionContentProps {
	className?: string;
	children: React.ReactNode;
	disableAnimation?: boolean;
}

export default function AccordionContent({
  className,
  children,
	disableAnimation,
  ...props
}: IAccordionContentProps & React.RefAttributes<HTMLDivElement>) {
	const context = useAccordionContext();
	// 개별 prop이 우선, 없으면 Context 값 사용
	const shouldDisableAnimation = disableAnimation ?? context?.disableAnimation ?? false;

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      //className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
			className={cn(
				'overflow-hidden text-sm',
				!shouldDisableAnimation && 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
				className,
			)}
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}