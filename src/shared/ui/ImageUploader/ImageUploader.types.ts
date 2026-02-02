export interface ImageUploaderProps {
	/**
	 * Дополнительный класс для корневого элемента
	 */
	className?: string;

	/**
	 * Колбэк, который вызывается при выборе или перетаскивании файлов
	 * @param files массив выбранных файлов
	 */
	onFilesChange?: (files: File[]) => void;

	/**
	 * Разрешить выбор нескольких файлов одновременно
	 * @default true
	 */
	multiple?: boolean;

	/**
	 * Принимаемые типы файлов (MIME-типы)
	 * @default "image/*"
	 */
	accept?: string;

	/**
	 * Отключенное состояние компонента
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Показывать состояние ошибки (красная рамка и текст ошибки)
	 * @default false
	 */
	error?: boolean;

	/**
	 * Текст ошибки, который отображается под компонентом
	 */
	errorText?: string;

	/**
	 * Текущее количество уже загруженных изображений
	 * Используется для отображения "Загружено: X фото"
	 * @default 0
	 */
	valueCount?: number;
}
