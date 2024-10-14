import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useEffect, useState } from 'react';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	onApply,
	onReset,
}) => {
	const [selectedOption, setSelectedOption] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedRadioOption, setSelectedRadioOption] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColorOption, setSelectedFontColorOption] =
		useState<OptionType>(defaultArticleState.fontColor);
	const [selectedBackgroundColorOption, setSelectedBackgroundColorOption] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedSizeOption, setSelectedSizeOption] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toogleForm = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const handleApply = () => {
		const newState: ArticleStateType = {
			fontFamilyOption: selectedOption,
			fontSizeOption: selectedRadioOption,
			fontColor: selectedFontColorOption,
			backgroundColor: selectedBackgroundColorOption,
			contentWidth: selectedSizeOption,
		};
		onApply(newState);
		setIsOpen(false);
	};

	const handleReset = () => {
		onReset();
	};

	useEffect(() => {
		setSelectedOption(articleState.fontFamilyOption);
		setSelectedRadioOption(articleState.fontSizeOption);
		setSelectedFontColorOption(articleState.fontColor);
		setSelectedBackgroundColorOption(articleState.backgroundColor);
		setSelectedSizeOption(articleState.contentWidth);
	}, [articleState]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toogleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.topMargin}>
						<Select
							selected={selectedOption}
							options={fontFamilyOptions}
							placeholder={`${selectedOption?.title ?? 'Выберите шрифт'}`}
							onChange={setSelectedOption}
							title='Шрифт'
						/>
					</div>
					<div className={clsx(styles.topMargin)}>
						<RadioGroup
							name='fontStyles'
							options={fontSizeOptions}
							selected={selectedRadioOption}
							onChange={setSelectedRadioOption}
							title='Стиль шрифта'
						/>
					</div>
					<div className={clsx(styles.topMargin, styles.bottomMargin)}>
						<Select
							selected={selectedFontColorOption}
							options={fontColors}
							placeholder={`${
								selectedFontColorOption?.title ?? 'Выберите шрифт'
							}`}
							onChange={setSelectedFontColorOption}
							title='Цвет шрифта'
						/>
					</div>
					<div className={styles.topMargin}>
						<Select
							selected={selectedBackgroundColorOption}
							options={backgroundColors}
							placeholder={`${
								selectedBackgroundColorOption?.title ?? 'Выберите шрифт'
							}`}
							onChange={setSelectedBackgroundColorOption}
							title='Цвет фона'
						/>
					</div>
					<div className={clsx(styles.topMargin, styles.bottomMargin)}>
						<Select
							selected={selectedSizeOption}
							options={contentWidthArr}
							placeholder={`${selectedSizeOption?.title ?? 'Выберите шрифт'}`}
							onChange={setSelectedSizeOption}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='clear' />
						<Button title='Применить' onClick={handleApply} type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
