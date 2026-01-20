import React, { useState, useRef, useEffect } from 'react';
import { Search } from './Search';

export default {
	title: 'Shared/UI/Search',
	component: Search,
	inlineStories: true,
	tags: ['autodocs'],
};

const SearchWithAutoFocus = ({
	initialValue = '',
	placeholder = 'Искать навык',
}) => {
	const [value, setValue] = useState(initialValue);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<Search
			placeholder={placeholder}
			value={value}
			onChange={setValue}
			onClear={() => setValue('')}
			ref={inputRef}
		/>
	);
};

export const Default = () => {
	const [value, setValue] = useState('');
	return (
		<Search value={value} onChange={setValue} onClear={() => setValue('')} />
	);
};

export const Focus = () => <SearchWithAutoFocus placeholder="" />;

export const Typing = () => <SearchWithAutoFocus initialValue="Искать навык" />;

export const Filled = () => {
	const [value, setValue] = useState('Искать навык');
	return (
		<Search value={value} onChange={setValue} onClear={() => setValue('')} />
	);
};
