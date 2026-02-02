import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../../../api/categories';
import { getSubcategories } from '../../../../../api/subcategories';
import {
	addSkill,
	clearSkillDraft,
	getSkillDraft,
	setSkillDraft,
} from '../../../../../entities/skill/model/storageUtils';
import type {
	ISkillCategory,
	ISkillSubcategory,
	Skill,
} from '../../../../../entities/skill/model/types';
import {
	addUser,
	clearUserDraft,
	getUserDraft,
	getUsers,
	setCurrentUser,
} from '../../../../../entities/user/model/storageUtils';
import type {
	ICurrentUser,
	IStoredUser,
} from '../../../../../entities/user/model/types';

export const useStep3Form = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		teachSkillTitle: '',
		teachCategoryId: '',
		teachSubcategoryId: '',
		teachDescription: '',
	});

	const [errors, setErrors] = useState<{
		teachSkillTitle: string;
		teachDescription: string;
		images?: string;
	}>({
		teachSkillTitle: '',
		teachDescription: '',
	});

	const [categories, setCategories] = useState<ISkillCategory[]>([]);
	const [subcategories, setSubcategories] = useState<ISkillSubcategory[]>([]);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const [isSkillEditOpen, setIsSkillEditOpen] = useState(false);

	useEffect(() => {
		getCategories().then(setCategories);
		getSubcategories().then(setSubcategories);
	}, []);

	useEffect(() => {
		const skillDraft = getSkillDraft();
		if (skillDraft) {
			let restoredCategoryId = '';
			if (skillDraft.subcategoryId) {
				const sub = subcategories.find(
					(s) => s.id === skillDraft.subcategoryId,
				);
				if (sub) restoredCategoryId = sub.categoryId.toString();
			}
			setFormData({
				teachSkillTitle: skillDraft.title || '',
				teachCategoryId: restoredCategoryId,
				teachSubcategoryId: skillDraft.subcategoryId?.toString() || '',
				teachDescription: skillDraft.description || '',
			});
			if (skillDraft.images && skillDraft.images.length > 0) {
				setImagePreviews(skillDraft.images);
			}
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
			setSkillDraft({
				title: field === 'teachSkillTitle' ? value : formData.teachSkillTitle,
				subcategoryId:
					field === 'teachSubcategoryId'
						? Number(value)
						: Number(formData.teachSubcategoryId),
				description:
					field === 'teachDescription' ? value : formData.teachDescription,
			});
			if (field === 'teachSkillTitle' && value?.trim()) {
				setErrors((prev) => ({ ...prev, teachSkillTitle: '' }));
			}
			if (field === 'teachDescription' && value?.trim()) {
				setErrors((prev) => ({ ...prev, teachDescription: '' }));
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

	const handleImagesChange = (files: File[]) => {
		if (!files?.length) return;
		const newPreviews = files.map((file) => URL.createObjectURL(file));
		setImagePreviews((prev) => [...prev, ...newPreviews]);
		Promise.all(
			files.map(
				(file) =>
					new Promise<string>((resolve) => {
						const reader = new FileReader();
						reader.onload = () => resolve(reader.result as string);
						reader.readAsDataURL(file);
					}),
			),
		).then((base64Array) => {
			const draft = getSkillDraft() || {};
			const updatedImages = [...(draft.images || []), ...base64Array];
			setSkillDraft({ ...draft, images: updatedImages });
			setImagePreviews(updatedImages);
		});
	};

	const imagesCount = imagePreviews.length;

	const isFormValid =
		formData.teachSkillTitle?.trim() !== '' &&
		formData.teachSubcategoryId?.trim() !== '' &&
		formData.teachDescription?.trim() !== '' &&
		imagesCount >= 4;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let hasError = false;
		if (!formData.teachSkillTitle?.trim()) {
			setErrors((prev) => ({
				...prev,
				teachSkillTitle: 'Название навыка обязательно',
			}));
			hasError = true;
		}
		if (!formData.teachDescription?.trim()) {
			setErrors((prev) => ({
				...prev,
				teachDescription: 'Описание обязательно',
			}));
			hasError = true;
		}
		if (!formData.teachSubcategoryId?.trim()) {
			hasError = true;
		}
		if (imagesCount < 4) {
			setErrors((prev) => ({
				...prev,
				images: `Необходимо загрузить минимум 4 изображения (загружено ${imagesCount})`,
			}));
			hasError = true;
		}
		if (hasError) return;
		setIsSkillEditOpen(true);
	};

	const handleSkillEditDone = () => {
		const userDraft = getUserDraft();
		if (!userDraft?.email || !userDraft?.password) {
			console.error('Нет данных пользователя для завершения регистрации');
			return;
		}

		const users = getUsers();
		const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
		const newUserId = maxId + 1;

		const storedUser: IStoredUser = {
			id: newUserId,
			name: userDraft.name || userDraft.email.split('@')[0] || 'Пользователь',
			email: userDraft.email,
			password: userDraft.password,
			avatar: userDraft.avatar,
			cityId: userDraft.cityId,
			dateOfBirth: userDraft.dateOfBirth,
			gender: userDraft.gender,
			registrationDate: new Date().toISOString(),
			canTeach: [],
			wantToLearn: [],
		};

		addUser(storedUser);

		const currentUser: ICurrentUser = {
			id: newUserId,
			name: storedUser.name,
			email: storedUser.email,
			avatar: storedUser.avatar,
			cityId: storedUser.cityId,
			dateOfBirth: storedUser.dateOfBirth,
			gender: storedUser.gender,
			registrationDate: storedUser.registrationDate,
		};

		setCurrentUser(currentUser);

		const newSkill: Skill = {
			id: Date.now(),
			userId: newUserId,
			title: formData.teachSkillTitle,
			description: formData.teachDescription,
			categoryId: Number(formData.teachCategoryId),
			subcategoryId: Number(formData.teachSubcategoryId),
			category:
				categories.find((c) => c.id === Number(formData.teachCategoryId))
					?.name || '',
			subcategory:
				subcategories.find((s) => s.id === Number(formData.teachSubcategoryId))
					?.name || '',
			createdAt: new Date().toISOString(),
			images: imagePreviews,
		};

		addSkill(newSkill);

		clearUserDraft();
		clearSkillDraft();

		setIsSkillEditOpen(false);
		navigate('/skill?success=true'); // ← редирект с флагом успеха
	};

	const handleSkillEditClose = () => {
		setIsSkillEditOpen(false);
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
		subcategories,
		filteredSubcategories,
		handleFieldChange,
		handleDropdownToggle,
		handleSubmit,
		handleBack,
		isFormValid,
		handleTitleBlur,
		handleDescriptionBlur,
		handleImagesChange,
		imagesCount,
		imagePreviews,
		isSkillEditOpen,
		handleSkillEditDone,
		handleSkillEditClose,
	};
};
