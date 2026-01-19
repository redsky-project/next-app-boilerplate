'use client';

import { JSX } from 'react';
import {
  Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@components/ui';

export default function AccordionEx(): JSX.Element {
	return (
		<>
			<h1>Accordion Example</h1>
			<Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>제품 정보</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
					당사의 대표 제품은 최첨단 기술과 세련된 디자인을 결합했습니다. 최고급 소재로 제작되어 탁월한 성능과 신뢰성을 제공합니다.
					</p>
					<p>
					주요 특징으로는 고급 처리 기능과 초보자와 전문가 모두를 위해 설계된 직관적인 사용자 인터페이스가 있습니다.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>배송 정보</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
					저희는 신뢰할 수 있는 택배 파트너사를 통해 전 세계 배송 서비스를 제공합니다. 일반 배송은 영업일 기준 3~5일 소요되며, 특급 배송은 영업일 기준 1~2일 이내 배송을 보장합니다.
          </p>
          <p>
					모든 주문은 꼼꼼하게 포장되며 전액 보험에 가입되어 있습니다. 전용 배송 조회 포털을 통해 실시간으로 배송 상황을 확인하실 수 있습니다.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>반품 정책</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
					저희는 제품에 대한 자신감을 바탕으로 30일 환불 보장 정책을 제공합니다. 제품에 완전히 만족하지 못하시면, 원래 상태 그대로 반품해 주시면 됩니다.
          </p>
          <p>
					저희는 번거로움 없는 반품 절차를 제공하며, 무료 반품 배송과 반품 상품 수령 후 48시간 이내 전액 환불을 처리해 드립니다.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
		</>
	);
}
