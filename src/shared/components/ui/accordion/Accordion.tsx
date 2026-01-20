'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { AccordionSingleProps, AccordionMultipleProps } from '@radix-ui/react-accordion';
import { type IconName } from '@/core/components/ui/icon/registry-icon';
import { AccordionProvider } from './AccordionContext';

interface IAccordionDefaultProps {
	disableAnimation?: boolean;
	expandIcon?: IconName;
}

export default function Accordion({
	disableAnimation = false,
	expandIcon,
	...props
}: IAccordionDefaultProps & (AccordionSingleProps | AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>) {
	return (
		<AccordionProvider value={{ disableAnimation, expandIcon }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				{...props}
			/>
		</AccordionProvider>
	);
}
