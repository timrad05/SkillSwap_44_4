import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../../../api/categories';
import { getSubcategories } from '../../../../../api/subcategories';
import type {
	ISkillCategory,
	ISkillSubcategory,
} from '../../../../../entities/skill/model/types';
import {
	getUserDraft,
	setUserDraft,
} from '../../../../../entities/user/model/storageUtils';
import type { IRegistrationDraft } from '../../../../../entities/user/model/types';

export const useStep3Form = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		teachSkillTitle: '',
		teachCategoryId: '',
		teachSubcategoryId: '',
		teachDescription: '',
	});

	const [errors, setErrors] = useState({
		teachSkillTitle: '',
		teachDescription: '',
	});

	const [categories, setCategories] = useState<ISkillCategory[]>([]);
	const [subcategories, setSubcategories] = useState<ISkillSubcategory[]>([]);

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	useEffect(() => {
		getCategories().then(setCategories);
		getSubcategories().then(setSubcategories);
	}, []);

	useEffect(() => {
		const draft = getUserDraft();
		if (draft) {
			let restoredCategoryId = '';
			if (draft.canTeach?.length && draft.canTeach[0]) {
				const subcategoryId = draft.canTeach[0];
				const subcategory = subcategories.find(
					(sub) => sub.id === subcategoryId,
				);
				if (subcategory) {
					restoredCategoryId = subcategory.categoryId.toString();
				}
			}
			setFormData({
				teachSkillTitle: '',
				teachCategoryId: restoredCategoryId,
				teachSubcategoryId: draft.canTeach?.[0]?.toString() || '',
				teachDescription: '',
			});
		}
	}, [subcategories]);

	const filteredSubcategories = subcategories.filter(
		(sub) => sub.categoryId === Number(formData.teachCategoryId),
	);

	const handleFieldChange =
		(field: keyof typeof formData) => (value: string) => {
			setFormData((prev) => {
				const newData = { ...prev, [field]: value };
				if (field === 'teachCategoryId') {
					const newCategoryId = Number(value);
					const currentSubId = Number(prev.teachSubcategoryId);
					const sub = subcategories.find((s) => s.id === currentSubId);
					if (!sub || sub.categoryId !== newCategoryId) {
						newData.teachSubcategoryId = '';
					}
				}
				return newData;
			});

			if (field === 'teachSkillTitle' && value?.trim()) {
				setErrors((prev) => ({ ...prev, teachSkillTitle: '' }));
			}
			if (field === 'teachDescription' && value?.trim()) {
				setErrors((prev) => ({ ...prev, teachDescription: '' }));
			}

			if (field === 'teachSubcategoryId') {
				const draftUpdate: Partial<IRegistrationDraft> = {};
				draftUpdate.canTeach = value ? [Number(value)] : undefined;
				setUserDraft(draftUpdate);
			}
		};

	const handleTitleBlur = () => {
		if (!formData.teachSkillTitle?.trim()) {
			setErrors((prev) => ({
				...prev,
				teachSkillTitle: 'Название навыка обязательно для заполнения',
			}));
		} else {
			setErrors((prev) => ({ ...prev, teachSkillTitle: '' }));
		}
	};

	const handleDescriptionBlur = () => {
		if (!formData.teachDescription?.trim()) {
			setErrors((prev) => ({
				...prev,
				teachDescription: 'Описание обязательно для заполнения',
			}));
		} else {
			setErrors((prev) => ({ ...prev, teachDescription: '' }));
		}
	};

	const isFormValid =
		formData.teachSkillTitle?.trim() !== '' &&
		formData.teachSubcategoryId?.trim() !== '' &&
		formData.teachDescription?.trim() !== '';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let hasError = false;

		if (!formData.teachSkillTitle?.trim()) {
			setErrors((prev) => ({
				...prev,
				teachSkillTitle: 'Название навыка обязательно для заполнения',
			}));
			hasError = true;
		}

		if (!formData.teachDescription?.trim()) {
			setErrors((prev) => ({
				...prev,
				teachDescription: 'Описание обязательно для заполнения',
			}));
			hasError = true;
		}

		if (!formData.teachSubcategoryId?.trim()) {
			hasError = true;
		}

		if (hasError) return;

		navigate('/skill');
	};

	const handleBack = () => navigate('/registration/step2');

	const handleDropdownToggle = (field: string) => {
		setOpenDropdown(openDropdown === field ? null : field);
	};

	return {
		formData,
		errors,
		openDropdown,
		categories,
		filteredSubcategories,
		handleFieldChange,
		handleDropdownToggle,
		handleSubmit,
		handleBack,
		isFormValid,
		handleTitleBlur,
		handleDescriptionBlur,
	};
};
