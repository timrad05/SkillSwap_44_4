import { InputField } from '../InputField';
import { DropDown } from '../DropDown';
import { Textarea } from '../Textarea';
import { Button } from '../Button';

import styles from './ProfileForm.module.scss';

export const ProfileForm = () => {
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
				<DropDown
					label="Дата рождения"
					placeholder="28.10.1995"
					options={[{ value: '1', label: '28.10.1995' }]}
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
