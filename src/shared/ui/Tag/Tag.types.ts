export type TagColor =
	| 'business'
	| 'creativity'
	| 'languages'
	| 'education'
	| 'home'
	| 'health'
	| 'plus';

export interface TagProps {
	/**
	 * Текст тега.
	 */
	text: string;
	/**
	 * Цвет фона тега .
	 */
	color?: TagColor | string;
}
