/**
 * External API Types
 * 외부 API 응답 데이터 타입 정의
 */

// KoreanJSON API - Posts
// https://koreanjson.com/posts
export interface IPost {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	UserId: number;
}

// KoreanJSON API - Users
// https://koreanjson.com/users
export interface IUser {
	id: number;
	name: string;
	email: string;
	username: string;
	phone: string;
	website: string;
	province: string;
	city: string;
	district: string;
	street: string;
	zipcode: string;
}

// KoreanJSON API - Comments
// https://koreanjson.com/comments
export interface IComment {
	id: number;
	postId: number;
	email: string;
	body: string;
}
