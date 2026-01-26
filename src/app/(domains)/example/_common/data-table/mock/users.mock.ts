import type { User, UserStatus, UserRole } from '@/app/(domains)/example/_types/data-table';

const firstNames = [
	'James',
	'John',
	'Robert',
	'Michael',
	'William',
	'David',
	'Richard',
	'Joseph',
	'Thomas',
	'Christopher',
	'Daniel',
	'Matthew',
	'Anthony',
	'Mark',
	'Donald',
	'Steven',
	'Andrew',
	'Paul',
	'Joshua',
	'Kenneth',
	'Mary',
	'Patricia',
	'Jennifer',
	'Linda',
	'Barbara',
	'Elizabeth',
	'Susan',
	'Jessica',
	'Sarah',
	'Karen',
	'Nancy',
	'Lisa',
	'Betty',
	'Margaret',
	'Sandra',
	'Ashley',
	'Kimberly',
	'Emily',
	'Donna',
	'Michelle',
];

const lastNames = [
	'Smith',
	'Johnson',
	'Williams',
	'Brown',
	'Jones',
	'Garcia',
	'Miller',
	'Davis',
	'Rodriguez',
	'Martinez',
	'Hernandez',
	'Lopez',
	'Gonzalez',
	'Wilson',
	'Anderson',
	'Thomas',
	'Taylor',
	'Moore',
	'Jackson',
	'Martin',
	'Lee',
	'Perez',
	'Thompson',
	'White',
	'Harris',
	'Sanchez',
	'Clark',
	'Ramirez',
	'Lewis',
	'Robinson',
];

const statuses: UserStatus[] = ['active', 'inactive', 'pending'];
const roles: UserRole[] = ['admin', 'user', 'moderator'];

// Seeded random function for consistent data generation
function seededRandom(seed: number): number {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function getRandomElement<T>(array: T[], seed: number): T {
	return array[Math.floor(seededRandom(seed) * array.length)];
}

function getRandomDate(start: Date, end: Date, seed: number): string {
	const date = new Date(start.getTime() + seededRandom(seed) * (end.getTime() - start.getTime()));
	return date.toISOString();
}

function generateUser(id: number): User {
	const firstName = getRandomElement(firstNames, id * 7);
	const lastName = getRandomElement(lastNames, id * 11);
	const name = `${firstName} ${lastName}`;
	const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`;
	const status = getRandomElement(statuses, id * 13);
	const role = getRandomElement(roles, id * 17);

	// 가입일: 2020년 1월 ~ 2025년 12월
	const joinedAt = getRandomDate(new Date(2020, 0, 1), new Date(2025, 11, 31), id * 19);

	// 마지막 활동: 가입일 이후 ~ 현재
	const lastActive = getRandomDate(new Date(joinedAt), new Date(), id * 23);

	// avatar는 id 기반으로 결정 (일관성 유지)
	const avatar = id % 2 === 0 ? `https://i.pravatar.cc/150?img=${(id % 70) + 1}` : undefined;

	return {
		id: `user-${id}`,
		name,
		email,
		status,
		role,
		joinedAt,
		lastActive,
		avatar,
	};
}

// 500건의 가상 사용자 데이터 생성 (seeded random으로 서버/클라이언트 동일하게 생성)
export const mockUsers: User[] = Array.from({ length: 500 }, (_, index) => generateUser(index + 1));

// 특정 조건의 사용자 필터링 헬퍼 함수
export function getUsersByStatus(status: UserStatus): User[] {
	return mockUsers.filter((user) => user.status === status);
}

export function getUsersByRole(role: UserRole): User[] {
	return mockUsers.filter((user) => user.role === role);
}

export function searchUsers(query: string): User[] {
	const lowerQuery = query.toLowerCase();
	return mockUsers.filter(
		(user) => user.name.toLowerCase().includes(lowerQuery) || user.email.toLowerCase().includes(lowerQuery)
	);
}
