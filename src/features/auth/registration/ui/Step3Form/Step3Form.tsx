import clsx from 'clsx';
import { Button } from '../../../../../shared/ui/Button';
import { DropDown } from '../../../../../shared/ui/DropDown';
import { InputField } from '../../../../../shared/ui/InputField';
import { Textarea } from '../../../../../shared/ui/Textarea';
import styles from './Step3Form.module.scss';
import type { Step3FormProps } from './Step3Form.types';
import { useStep3Form } from './useStep3Form';

export const Step3Form = ({ className = '' }: Step3FormProps) => {
	const {
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
	} = useStep3Form();

	return (
		<form className={clsx(styles.form, className)} onSubmit={handleSubmit}>
			<div className={styles.fields}>
				<InputField
					label="Название навыка"
					placeholder="Введите название вашего навыка"
					value={formData.teachSkillTitle}
					onChange={(e) => handleFieldChange('teachSkillTitle')(e.target.value)}
					onBlur={handleTitleBlur}
					required={true}
					error={!!errors.teachSkillTitle}
					errorText={errors.teachSkillTitle}
					id="skillName-input"
				/>
			</div>

			<div className={styles['dropdown-field']}>
				<DropDown
					options={categories.map((cat) => ({
						value: cat.id.toString(),
						label: cat.name,
					}))}
					label="Категория навыка"
					placeholder="Выберите категорию навыка"
					value={formData.teachCategoryId}
					onChange={handleFieldChange('teachCategoryId')}
					isOpen={openDropdown === 'category'}
					required={true}
					onToggle={() => handleDropdownToggle('category')}
				/>
			</div>

			<div className={styles['dropdown-field']}>
				<DropDown
					options={filteredSubcategories.map((sub) => ({
						value: sub.id.toString(),
						label: sub.name,
					}))}
					label="Подкатегория навыка"
					placeholder="Выберите подкатегорию навыка"
					value={formData.teachSubcategoryId}
					onChange={handleFieldChange('teachSubcategoryId')}
					isOpen={openDropdown === 'subcategory'}
					required={true}
					onToggle={() => handleDropdownToggle('subcategory')}
				/>
			</div>

			<div className={styles['textarea-field']}>
				<Textarea
					label="Описание"
					placeholder="Коротко опишите, чему можете научить"
					value={formData.teachDescription}
					onChange={(e) =>
						handleFieldChange('teachDescription')(e.target.value)
					}
					onBlur={handleDescriptionBlur}
					required={true}
					error={!!errors.teachDescription}
					errorText={errors.teachDescription}
					id="skillDescription-input"
				/>
			</div>

			<div className={clsx(styles.buttons)}>
				<Button type="button" variant="secondary" onClick={handleBack}>
					Назад
				</Button>
				<Button type="submit" variant="primary" disabled={!isFormValid}>
					Продолжить
				</Button>
			</div>
		</form>
	);
};
