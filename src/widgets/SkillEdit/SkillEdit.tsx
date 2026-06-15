import React from 'react';
import editIcon from '../../shared/assets/icons/edit.svg';
import { Button } from '../../shared/ui/Button';
import { SkillImages } from '../../shared/ui/SkillImages';
import { SkillInfo } from '../../shared/ui/SkillInfo';
import styles from './SkillEdit.module.scss';
import type { SkillEditProps } from './SkillEdit.types';

export const SkillEdit: React.FC<SkillEditProps> = ({
	title,
	subtitle,
	description,
	images,
	onEditClick,
	onDoneClick,
}) => {
	return (
		<>
			{/* Полупрозрачный оверлей на весь экран */}
			<div className={styles.overlay} />

			{/* Центрированная модалка */}
			<div className={styles.modal}>
				<div className={styles.container}>
					{/* Заголовок */}
					<div className={styles.header}>
						<h1 className={styles.title}>Ваше предложение</h1>
						<p className={styles.description}>
							Пожалуйста, проверьте и&nbsp;подтвердите правильность данных
						</p>
					</div>

					{/* Контент */}
					<div className={styles.content}>
						{/* Левая часть */}
						<div className={styles['info-section']}>
							<div className={styles['info-wrapper']}>
								<SkillInfo
									title={title}
									subtitle={subtitle}
									description={description}
								/>
							</div>

							{/* Кнопки */}
							<div className={styles['buttons-row']}>
								<button
									type="button"
									className={styles['edit-button']}
									onClick={onEditClick}
								>
									<span>Редактировать</span>
									<img
										src={editIcon}
										alt="Редактировать"
										width={16}
										height={16}
									/>
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

						{/* Правая часть */}
						<div className={styles['images-section']}>
							<SkillImages images={images} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
