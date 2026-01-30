import { useState } from 'react';
import { BirthDatePicker } from '../BirthDatePicker';
import { Button } from '../Button';
import { DropDown } from '../DropDown';
import { InputField } from '../InputField';
import { Textarea } from '../Textarea';
import styles from './ProfileForm.module.scss';

export const ProfileForm = () => {
	const [birthDate, setBirthDate] = useState('28.10.1995'); //чтобы менять дату. потом заменить на данные с сервера

	return (
		<form className={styles.form}>
			<div className={styles.block}>
				<InputField
					label="Почта"
					value="Mariia@gmail.com"
					variant="change"
					disabled
				/>
				<button type="button" className={styles['password-link']}>
					Изменить пароль
				</button>
			</div>
			<InputField label="Имя" value="Мария" variant="change" />
			<div className={styles.row}>
				<BirthDatePicker
					label="Дата рождения"
					value={birthDate}
					onChange={setBirthDate}
					placeholder="дд.мм.гггг"
					className={styles['custom-date-picker']}
				/>
				<DropDown
					label="Пол"
					value="female"
					options={[{ value: 'female', label: 'Женский' }]}
				/>
			</div>
			<DropDown
				label="Город"
				value="moscow"
				options={[{ value: 'moscow', label: 'Москва' }]}
			/>
			<Textarea
				label="О себе"
				value="Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем-то интересным!"
				showIcon
			/>
			<Button disabled className={styles.submit}>
				Сохранить
			</Button>
		</form>
	);
};
