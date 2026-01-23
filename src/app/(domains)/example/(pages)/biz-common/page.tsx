'use client';

import { JSX, useState } from 'react';
import { CodeBlockClient, Icon, Input, Button } from '@components/ui';
import { maskEmail, formatPhoneNumber, truncateString, FormatUtils } from '@/app/(domains)/example/_common';

interface IBizCommonPageProps {
	//children: React.ReactNode;
}

export default function BizCommonPage({}: IBizCommonPageProps): JSX.Element {
	// Function 방식 - maskEmail
	const [emailInput, setEmailInput] = useState<string>('example@domain.com');
	const [maskedEmail, setMaskedEmail] = useState<string>('');

	// Function 방식 - formatPhoneNumber
	const [phoneInput, setPhoneInput] = useState<string>('01012345678');
	const [formattedPhone, setFormattedPhone] = useState<string>('');

	// Function 방식 - truncateString
	const [truncateInput, setTruncateInput] = useState<string>('Hello World Example Text');
	const [truncatedString, setTruncatedString] = useState<string>('');

	// Class 방식 - formatCurrency
	const [currencyInput, setCurrencyInput] = useState<string>('1234567');
	const [formattedCurrency, setFormattedCurrency] = useState<string>('');

	// Class 방식 - formatDate
	const [dateInput, setDateInput] = useState<string>(new Date().toISOString());
	const [formattedDate, setFormattedDate] = useState<string>('');

	// Class 방식 - formatFileSize
	const [fileSizeInput, setFileSizeInput] = useState<string>('1536000');
	const [formattedFileSize, setFormattedFileSize] = useState<string>('');

	// Handlers
	const handleMaskEmail = () => {
		setMaskedEmail(maskEmail(emailInput));
	};

	const handleFormatPhone = () => {
		setFormattedPhone(formatPhoneNumber(phoneInput));
	};

	const handleTruncateString = () => {
		setTruncatedString(truncateString(truncateInput, 10));
	};

	const handleFormatCurrency = () => {
		const amount = parseFloat(currencyInput) || 0;
		setFormattedCurrency(FormatUtils.formatCurrency(amount));
	};

	const handleFormatDate = () => {
		setFormattedDate(FormatUtils.formatDate(new Date(dateInput), 'YYYY-MM-DD', { includeTime: true }));
	};

	const handleFormatFileSize = () => {
		const bytes = parseInt(fileSizeInput) || 0;
		setFormattedFileSize(FormatUtils.formatFileSize(bytes));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col gap-2 pb-8">
				<h1 className="scroll-m-20 text-4xl font-bold tracking-tight">업무(domain)별 공통함수 사용하기</h1>
				<p className="text-muted-foreground text-lg">example 도메인에서만 사용하는 공통 유틸리티 함수들입니다.</p>
				<p className="text-muted-foreground">
					<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm">
						src/app/(domains)/example/_common
					</code>
				</p>
			</div>

			{/* Function 방식 섹션 */}
			<div className="mb-12">
				<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6">Function 방식 공통함수</h2>

				{/* maskEmail */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">maskEmail()</h3>
						<p className="text-muted-foreground text-base">
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
								maskEmail(email: string, options?: EmailMaskOptions)
							</code>
						</p>
						<p className="text-muted-foreground text-base">
							이메일 주소를 마스킹 처리합니다. @ 앞의 일부만 보이고 나머지는 * 처리됩니다.
						</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<div className="grid gap-2">
								<div className="py-2 flex items-center justify-between gap-4">
									<Input
										value={emailInput}
										onChange={(e) => setEmailInput(e.target.value)}
										className="flex-1"
										placeholder="이메일 입력"
									/>
									<Button
										onClick={handleMaskEmail}
										variant="default"
									>
										마스킹
									</Button>
									<Icon name="ChevronsRight" />
									<Input
										readOnly
										value={maskedEmail}
										className="flex-1"
										placeholder="결과"
									/>
								</div>
							</div>
						</div>
						<CodeBlockClient
							lang="tsx"
							code={`import { maskEmail } from '@/app/(domains)/example/_common';

const masked = maskEmail('example@domain.com');
// 결과: 'ex*****@domain.com'

// 옵션 사용
const masked2 = maskEmail('example@domain.com', { 
  maskChar: '#', 
  visibleStart: 3 
});
// 결과: 'exa####@domain.com'`}
						/>
					</div>
				</div>

				{/* formatPhoneNumber */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">formatPhoneNumber()</h3>
						<p className="text-muted-foreground text-base">
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
								formatPhoneNumber(phoneNumber: string, options?: PhoneNumberFormatOptions)
							</code>
						</p>
						<p className="text-muted-foreground text-base">전화번호를 포맷팅합니다. 한국 전화번호 형식을 지원합니다.</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<div className="grid gap-2">
								<div className="py-2 flex items-center justify-between gap-4">
									<Input
										value={phoneInput}
										onChange={(e) => setPhoneInput(e.target.value)}
										className="flex-1"
										placeholder="전화번호 입력 (숫자만)"
									/>
									<Button
										onClick={handleFormatPhone}
										variant="default"
									>
										포맷팅
									</Button>
									<Icon name="ChevronsRight" />
									<Input
										readOnly
										value={formattedPhone}
										className="flex-1"
										placeholder="결과"
									/>
								</div>
							</div>
						</div>
						<CodeBlockClient
							lang="tsx"
							code={`import { formatPhoneNumber } from '@/app/(domains)/example/_common';

const formatted = formatPhoneNumber('01012345678');
// 결과: '010-1234-5678'

// 구분자 변경
const formatted2 = formatPhoneNumber('01012345678', { separator: ' ' });
// 결과: '010 1234 5678'

// 국가 코드 포함
const formatted3 = formatPhoneNumber('01012345678', { 
  includeCountryCode: true 
});
// 결과: '+82-10-1234-5678'`}
						/>
					</div>
				</div>

				{/* truncateString */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">truncateString()</h3>
						<p className="text-muted-foreground text-base">
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
								truncateString(str: string, maxLength: number, options?: TruncateOptions)
							</code>
						</p>
						<p className="text-muted-foreground text-base">문자열을 지정된 길이로 자르고 생략 문자를 추가합니다.</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<div className="grid gap-2">
								<div className="py-2 flex items-center justify-between gap-4">
									<Input
										value={truncateInput}
										onChange={(e) => setTruncateInput(e.target.value)}
										className="flex-1"
										placeholder="텍스트 입력"
									/>
									<Button
										onClick={handleTruncateString}
										variant="default"
									>
										자르기 (10자)
									</Button>
									<Icon name="ChevronsRight" />
									<Input
										readOnly
										value={truncatedString}
										className="flex-1"
										placeholder="결과"
									/>
								</div>
							</div>
						</div>
						<CodeBlockClient
							lang="tsx"
							code={`import { truncateString } from '@/app/(domains)/example/_common';

const truncated = truncateString('Hello World Example', 10);
// 결과: 'Hello W...'

// 단어 단위로 자르기
const truncated2 = truncateString('Hello World Example', 10, { 
  wordBoundary: true 
});
// 결과: 'Hello...'

// 생략 문자 변경
const truncated3 = truncateString('Hello World Example', 10, { 
  ellipsis: '›' 
});
// 결과: 'Hello Wor›'`}
						/>
					</div>
				</div>
			</div>

			{/* Class 방식 섹션 */}
			<div className="mb-12">
				<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6">Class 방식 공통함수 (Singleton)</h2>
				<p className="text-muted-foreground text-base mb-6">
					<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm">FormatUtils</code>{' '}
					클래스는 Singleton 패턴으로 구현되어 즉시 인스턴스가 생성됩니다.
				</p>

				{/* formatCurrency */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">FormatUtils.formatCurrency()</h3>
						<p className="text-muted-foreground text-base">
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
								FormatUtils.formatCurrency(amount: number, options?: CurrencyFormatOptions)
							</code>
						</p>
						<p className="text-muted-foreground text-base">숫자를 금액 형식으로 포맷팅합니다.</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<div className="grid gap-2">
								<div className="py-2 flex items-center justify-between gap-4">
									<Input
										value={currencyInput}
										onChange={(e) => setCurrencyInput(e.target.value)}
										className="flex-1"
										placeholder="금액 입력"
										type="number"
									/>
									<Button
										onClick={handleFormatCurrency}
										variant="default"
									>
										포맷팅
									</Button>
									<Icon name="ChevronsRight" />
									<Input
										readOnly
										value={formattedCurrency}
										className="flex-1"
										placeholder="결과"
									/>
								</div>
							</div>
						</div>
						<CodeBlockClient
							lang="tsx"
							code={`import { FormatUtils } from '@/app/(domains)/example/_common';

const formatted = FormatUtils.formatCurrency(1234567);
// 결과: '₩1,234,567'

// USD 통화
const formatted2 = FormatUtils.formatCurrency(1234.567, { 
  currency: 'USD', 
  decimalPlaces: 2 
});
// 결과: '$1,234.57'

// 통화 기호 제외
const formatted3 = FormatUtils.formatCurrency(1234567, { 
  showSymbol: false 
});
// 결과: '1,234,567'`}
						/>
					</div>
				</div>

				{/* formatDate */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">FormatUtils.formatDate()</h3>
						<p className="text-muted-foreground text-base">
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
								FormatUtils.formatDate(date: Date | string, format?: string, options?: DateFormatOptions)
							</code>
						</p>
						<p className="text-muted-foreground text-base">Date 객체를 지정된 형식의 문자열로 변환합니다.</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<div className="grid gap-2">
								<div className="py-2 flex items-center justify-between gap-4">
									<Input
										value={dateInput}
										onChange={(e) => setDateInput(e.target.value)}
										className="flex-1"
										placeholder="날짜 입력 (ISO)"
										type="datetime-local"
									/>
									<Button
										onClick={handleFormatDate}
										variant="default"
									>
										포맷팅
									</Button>
									<Icon name="ChevronsRight" />
									<Input
										readOnly
										value={formattedDate}
										className="flex-1"
										placeholder="결과"
									/>
								</div>
							</div>
						</div>
						<CodeBlockClient
							lang="tsx"
							code={`import { FormatUtils } from '@/app/(domains)/example/_common';

const date = new Date('2026-01-22T15:30:45');

const formatted = FormatUtils.formatDate(date, 'YYYY-MM-DD');
// 결과: '2026-01-22'

// 시간 포함
const formatted2 = FormatUtils.formatDate(date, 'YYYY.MM.DD', { 
  includeTime: true 
});
// 결과: '2026.01.22 15:30'

// 초 포함
const formatted3 = FormatUtils.formatDate(date, 'YYYY/MM/DD', { 
  includeTime: true, 
  includeSeconds: true 
});
// 결과: '2026/01/22 15:30:45'`}
						/>
					</div>
				</div>

				{/* formatFileSize */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">FormatUtils.formatFileSize()</h3>
						<p className="text-muted-foreground text-base">
							<code className="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold">
								FormatUtils.formatFileSize(bytes: number, decimals?: number)
							</code>
						</p>
						<p className="text-muted-foreground text-base">파일 크기를 읽기 쉬운 형식으로 변환합니다.</p>
					</div>
					<div className="w-full flex-1 py-4">
						<div className="w-full rounded-lg border border-neutral-200 overflow-hidden dark:border-neutral-800 px-6 py-4 shadow-sm">
							<div className="grid gap-2">
								<div className="py-2 flex items-center justify-between gap-4">
									<Input
										value={fileSizeInput}
										onChange={(e) => setFileSizeInput(e.target.value)}
										className="flex-1"
										placeholder="바이트 입력"
										type="number"
									/>
									<Button
										onClick={handleFormatFileSize}
										variant="default"
									>
										포맷팅
									</Button>
									<Icon name="ChevronsRight" />
									<Input
										readOnly
										value={formattedFileSize}
										className="flex-1"
										placeholder="결과"
									/>
								</div>
							</div>
						</div>
						<CodeBlockClient
							lang="tsx"
							code={`import { FormatUtils } from '@/app/(domains)/example/_common';

const formatted = FormatUtils.formatFileSize(1024);
// 결과: '1.00 KB'

const formatted2 = FormatUtils.formatFileSize(1536000);
// 결과: '1.46 MB'

const formatted3 = FormatUtils.formatFileSize(1536000, 0);
// 결과: '1 MB'`}
						/>
					</div>
				</div>

				{/* 기타 함수들 설명 */}
				<div className="mb-8">
					<div className="flex flex-col gap-2 pt-6">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">기타 유틸리티 함수들</h3>
						<p className="text-muted-foreground text-base">FormatUtils는 다음의 추가 함수들도 제공합니다.</p>
					</div>
					<div className="w-full flex-1 py-4">
						<CodeBlockClient
							lang="tsx"
							code={`import { FormatUtils } from '@/app/(domains)/example/_common';

// 퍼센트 포맷팅
FormatUtils.formatPercent(0.1234);
// 결과: '12.34%'

FormatUtils.formatPercent(75, false);
// 결과: '75.00%'

// 숫자 축약 형식
FormatUtils.formatCompactNumber(1234);
// 결과: '1.2K'

FormatUtils.formatCompactNumber(1234567);
// 결과: '1.2M'

FormatUtils.formatCompactNumber(1234567890);
// 결과: '1.2B'`}
						/>
					</div>
				</div>
			</div>

			{/* Import 방법 안내 */}
			<div className="mb-12">
				<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6">Import 방법</h2>
				<div className="w-full flex-1">
					<CodeBlockClient
						lang="tsx"
						code={`// 방법 1: 통합 import (권장)
import { 
  maskEmail, 
  formatPhoneNumber, 
  truncateString,
  FormatUtils 
} from '@/app/(domains)/example/_common';

// 방법 2: 개별 파일에서 import
import { maskEmail } from '@/app/(domains)/example/_common/string-utils';
import FormatUtils from '@/app/(domains)/example/_common/format-utils';

// 방법 3: 타입까지 함께 import
import { 
  maskEmail, 
  type EmailMaskOptions,
  FormatUtils,
  type CurrencyFormatOptions 
} from '@/app/(domains)/example/_common';`}
					/>
				</div>
			</div>
		</div>
	);
}
