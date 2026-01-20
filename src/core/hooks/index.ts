// API hooks
export * from './api';

// Utility hooks
export { useLockBodyScroll } from './useLockBodyScroll';

import { useContext } from 'react';
import AccordionContext from '@/shared/components/ui/accordion/AccordionContext';
// AccordionContext를 사용하는 커스텀 Hook.=====================================================
export const useAccordionContext = () => {
	const context = useContext(AccordionContext);
	return context;
};
// =========================================================================================
