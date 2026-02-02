export interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	cityId?: number;
	dateOfBirth?: string;
	canTeach?: number[];
	wantToLearn?: number[];
	gender?: 'male' | 'female';
	about?: string;
	registrationDate?: string;
}

export interface IStoredUser extends User {
	password: string;
}

export interface IRegistrationDraft {
	name?: string;
	email?: string;
	avatar?: string;
	cityId?: number;
	dateOfBirth?: string;
	canTeach?: number[];
	wantToLearn?: number[];
	gender?: 'male' | 'female';
	password?: string;
}

export type ICurrentUser = User;
