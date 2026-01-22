import React from 'react';
import type { TagProps } from './Tag.types';
import styles from './Tag.module.scss';

export const Tag: React.FC<TagProps> = ({ text, color = 'plus' }) => {
	const tagClass = `${styles.tag} ${styles[color] || styles.plus}`.trim();

	return <span className={tagClass}>{text}</span>;
};
