import error404Img from '../../shared/assets/images/error-404.png';
import error500Img from '../../shared/assets/images/error-500.png';
import { Button } from '../../shared/ui/Button';
import { Info } from '../../shared/ui/Info';
import cls from './ErrorMessage.module.scss';
import type { ErrorMessageProps } from './ErrorMessage.types';

const ERROR_DATA = {
	'404': {
		image: error404Img,
		title: 'Страница не найдена',
		text: 'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
	},
	'500': {
		image: error500Img,
		title: 'На сервере произошла ошибка',
		text: 'Попробуйте позже или вернитесь на главную страницу',
	},
};

export const ErrorMessage = ({ type = '404' }: ErrorMessageProps) => {
	const data = ERROR_DATA[type];
	const handleGoHome = () => {
		alert('Функция перехода на домашнюю страницу еще не реализована');
	};
	const handleReport = () => {
		alert('Функция отправки отчета об ошибке еще не реализована');
	};
	return (
		<div className={cls.page}>
			<div className={cls.container}>
				<Info
					image={data.image}
					title={data.title}
					text={data.text}
					className={cls['info-card']}
				>
					<Button variant="secondary" onClick={handleReport}>
						Сообщить об ошибке
					</Button>
					<Button variant="primary" onClick={handleGoHome}>
						Вернуться на главную
					</Button>
				</Info>
			</div>
		</div>
	);
};
