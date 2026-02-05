import type { ChangeEvent, SyntheticEvent } from 'react';
import type { City } from '../../../entities/city/model/types';

export interface FormValue {
	email: string;
	name: string;
	avatar: string;
	cityId: number | undefined;
	dateOfBirth: string;
	gender: 'male' | 'female' | undefined;
	about: string;
}

export interface ProfileFormProps {
	profileFormData: FormValue;
	isFormChanged: boolean;
	handleSubmit: (e: SyntheticEvent) => void;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleDateChange: (formattedDate: string) => void;
	handleGenderChange: (value: string) => void;
	handleCityChange: (value: string) => void;
	handleTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	handlePasswordChange: (value: string) => void;
	updateError?: string;
	cities?: City[];
	error: { email: string | null; name: string | null };
}
