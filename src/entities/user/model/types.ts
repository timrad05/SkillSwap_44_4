export interface User {
	id: number;
	name: string;
	avatar?: string;
	cityId?: number;
	dateOfBirth?: string;
	canTeach?: number[];
	wantToLearn?: number[];
	gender?: 'male' | 'female';
}
