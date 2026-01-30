import React from 'react';
import { SkillInfo } from '../../shared/ui/SkillInfo';
import { SkillImages } from '../../shared/ui/SkillImages';
import { Button } from '../../shared/ui/Button';
import editIcon from '../../shared/assets/icons/edit.svg';
import type { SkillEditProps } from './SkillEdit.types';
import styles from './SkillEdit.module.scss';

export const SkillEdit: React.FC<SkillEditProps> = ({
	title,
	subtitle,
	description,
	images,
	onEditClick,
	onDoneClick,
}) => {
	return (
		<div className={styles.modal}>
			{/* Блок заголовка с описанием */}
			<div className={styles.header}>
				<h1 className={styles.title}>Ваше предложение</h1>
				<p className={styles.description}>
					Пожалуйста, проверьте и&nbsp;подтвердите правильность данных
				</p>
			</div>

			{/* Основной контент */}
			<div className={styles.content}>
				{/* Левая часть: SkillInfo без кнопки */}
				<div className={styles['info-section']}>
					<div className={styles['info-wrapper']}>
						<SkillInfo
							title={title}
							subtitle={subtitle}
							description={description}
						/>
					</div>

					{/* Кнопки редактировать и готово */}
					<div className={styles['buttons-row']}>
						<button
							type="button"
							className={styles['edit-button']}
							onClick={onEditClick}
						>
							<span>Редактировать</span>
							<img src={editIcon} alt="" width={16} height={16} />
						</button>

						<Button
							variant="primary"
							onClick={onDoneClick}
							className={styles['done-button']}
						>
							Готово
						</Button>
					</div>
				</div>

				{/* Правая часть: SkillImages */}
				<div className={styles['images-section']}>
					<SkillImages images={images} />
				</div>
			</div>
		</div>
	);
};
