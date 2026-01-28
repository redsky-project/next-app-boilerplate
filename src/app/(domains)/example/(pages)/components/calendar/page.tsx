'use client';

import * as React from 'react';
import { Calendar } from '@/core/components/shadcn/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/shadcn/ui/card';
import type { DateRange } from 'react-day-picker';

export default function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(undefined);
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="container mx-auto py-10 space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Calendar Component</h1>
				<p className="text-muted-foreground mt-2">
					Calendar 컴포넌트는 react-day-picker를 기반으로 한 날짜 선택 UI입니다.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				{/* Basic Calendar */}
				<Card>
					<CardHeader>
						<CardTitle>Basic Calendar</CardTitle>
						<CardDescription>단일 날짜 선택</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							className="rounded-lg border"
						/>
					</CardContent>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							선택된 날짜: {mounted && date ? date.toLocaleDateString('ko-KR') : '없음'}
						</p>
					</CardContent>
				</Card>

				{/* Range Calendar */}
				<Card>
					<CardHeader>
						<CardTitle>Range Calendar</CardTitle>
						<CardDescription>날짜 범위 선택</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<Calendar
							mode="range"
							selected={dateRange}
							onSelect={setDateRange}
							numberOfMonths={1}
							className="rounded-lg border"
						/>
					</CardContent>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							시작: {mounted && dateRange?.from ? dateRange.from.toLocaleDateString('ko-KR') : '없음'}
						</p>
						<p className="text-sm text-muted-foreground">
							종료: {mounted && dateRange?.to ? dateRange.to.toLocaleDateString('ko-KR') : '없음'}
						</p>
					</CardContent>
				</Card>

				{/* Calendar with Dropdown */}
				<Card>
					<CardHeader>
						<CardTitle>Month & Year Selector</CardTitle>
						<CardDescription>드롭다운으로 월/연도 선택</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							captionLayout="dropdown"
							fromYear={1900}
							toYear={2100}
							className="rounded-lg border"
						/>
					</CardContent>
				</Card>

				{/* Multiple Months */}
				<Card>
					<CardHeader>
						<CardTitle>Multiple Months</CardTitle>
						<CardDescription>여러 달 표시</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							numberOfMonths={2}
							className="rounded-lg border"
						/>
					</CardContent>
				</Card>

				{/* Week Numbers */}
				<Card>
					<CardHeader>
						<CardTitle>With Week Numbers</CardTitle>
						<CardDescription>주차 번호 표시</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							showWeekNumber
							className="rounded-lg border"
						/>
					</CardContent>
				</Card>

				{/* Disabled Dates */}
				<Card>
					<CardHeader>
						<CardTitle>Disabled Dates</CardTitle>
						<CardDescription>특정 날짜 비활성화</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							disabled={(date) => {
								// 주말 비활성화
								return date.getDay() === 0 || date.getDay() === 6;
							}}
							className="rounded-lg border"
						/>
					</CardContent>
					<CardContent>
						<p className="text-sm text-muted-foreground">* 주말은 선택할 수 없습니다</p>
					</CardContent>
				</Card>
			</div>

			{/* Code Example */}
			<Card>
				<CardHeader>
					<CardTitle>사용 예제</CardTitle>
				</CardHeader>
				<CardContent>
					<pre className="bg-muted p-4 rounded-lg overflow-x-auto">
						<code>{`import { Calendar } from "@/core/components/shadcn/ui/calendar"
import type { DateRange } from "react-day-picker"

// 단일 날짜 선택
const [date, setDate] = React.useState<Date | undefined>(undefined)

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border"
/>

// 날짜 범위 선택
const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  className="rounded-lg border"
/>`}</code>
					</pre>
				</CardContent>
			</Card>

			{/* Dependencies Info */}
			<Card>
				<CardHeader>
					<CardTitle>라이브러리 정보</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<div>
						<h3 className="font-semibold">react-day-picker</h3>
						<p className="text-sm text-muted-foreground">Calendar UI 컴포넌트 라이브러리 - 날짜 선택 인터페이스 제공</p>
					</div>
					<div>
						<h3 className="font-semibold">date-fns</h3>
						<p className="text-sm text-muted-foreground">날짜 유틸리티 라이브러리 - 날짜 포맷팅, 계산, 비교 등</p>
					</div>
					<div>
						<h3 className="font-semibold">dayjs (프로젝트 기존 사용)</h3>
						<p className="text-sm text-muted-foreground">기존 날짜 처리 라이브러리 - Calendar와 함께 사용 가능</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
