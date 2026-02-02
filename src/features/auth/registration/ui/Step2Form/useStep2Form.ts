import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../../../api/categories';
import { getCities } from '../../../../../api/cities';
import { getSubcategories } from '../../../../../api/subcategories';
import type { City } from '../../../../../entities/city/model/types';
import type {
	ISkillCategory,
	ISkillSubcategory,
} from '../../../../../entities/skill/model/types';
import {
	getUserDraft,
	setUserDraft,
} from '../../../../../entities/user/model/storageUtils';
import type { IRegistrationDraft } from '../../../../../entities/user/model/types';

export const useStep2Form = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		birthDate: '',
		gender: '',
		cityId: '',
		learnCategoryId: '',
		learnSubcategoryId: '',
	});
	const [errors, setErrors] = useState({ name: '' });
	const [cities, setCities] = useState<City[]>([]);
	const [categories, setCategories] = useState<ISkillCategory[]>([]);
	const [subcategories, setSubcategories] = useState<ISkillSubcategory[]>([]);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	useEffect(() => {
		getCities().then(setCities);
		getCategories().then(setCategories);
		getSubcategories().then(setSubcategories);
	}, []);

	useEffect(() => {
		const draft = getUserDraft();
		if (draft) {
			let restoredCategoryId = '';
			if (draft.wantToLearn?.length && draft.wantToLearn[0]) {
				const subcategoryId = draft.wantToLearn[0];
				const subcategory = subcategories.find(
					(sub) => sub.id === subcategoryId,
				);
				if (subcategory) {
					restoredCategoryId = subcategory.categoryId.toString();
				}
			}

			setFormData({
				name: draft.name || '',
				birthDate: draft.dateOfBirth || '',
				gender: draft.gender || 'unspecified',
				cityId: draft.cityId?.toString() || '',
				learnCategoryId: restoredCategoryId,
				learnSubcategoryId: draft.wantToLearn?.[0]?.toString() || '',
			});
		}
	}, [subcategories]);

	const filteredSubcategories = subcategories.filter(
		(sub) => sub.categoryId === Number(formData.learnCategoryId),
	);

	const handleFieldChange =
		(field: keyof typeof formData) => (value: string) => {
			setFormData((prev) => {
				const newData = { ...prev, [field]: value };

				if (field === 'learnCategoryId') {
					const newCategoryId = Number(value);
					const currentSubId = Number(prev.learnSubcategoryId);
					const sub = subcategories.find((s) => s.id === currentSubId);
					if (!sub || sub.categoryId !== newCategoryId) {
						newData.learnSubcategoryId = '';
					}
				}

				return newData;
			});

			if (field === 'name') {
				setErrors((prev) => ({ ...prev, name: '' }));
			}

			const draftUpdate: Partial<IRegistrationDraft> = {};
			switch (field) {
				case 'name':
					draftUpdate.name = value;
					break;
				case 'birthDate':
					draftUpdate.dateOfBirth = value;
					break;
				case 'gender':
					draftUpdate.gender =
						value === 'unspecified' ? undefined : (value as 'male' | 'female');
					break;
				case 'cityId':
					draftUpdate.cityId = value ? Number(value) : undefined;
					break;
				case 'learnSubcategoryId':
					draftUpdate.wantToLearn = value ? [Number(value)] : undefined;
					break;
				default:
					break;
			}
			setUserDraft(draftUpdate);
		};

	const isFormValid =
		!!formData.name?.trim() &&
		!!formData.birthDate &&
		!!formData.gender &&
		!!formData.cityId &&
		!!formData.learnSubcategoryId;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name?.trim()) {
			setErrors({ name: 'Имя обязательно для заполнения' });
			return;
		}

		navigate('/registration/step3');
	};

	const handleBack = () => navigate('/registration/step1');

	const handleDropdownToggle = (field: string) => {
		setOpenDropdown(openDropdown === field ? null : field);
	};

	return {
		formData,
		errors,
		openDropdown,
		cities,
		categories,
		filteredSubcategories,
		handleFieldChange,
		handleDropdownToggle,
		handleSubmit,
		handleBack,
		isFormValid,
	};
};
