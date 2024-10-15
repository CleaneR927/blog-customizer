import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useEffect, useRef, useState } from 'react';
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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
	const [selectedFontFamilyOption, setSelectedOption] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSizeOption, setSelectedRadioOption] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColorOption, setSelectedFontColorOption] =
		useState<OptionType>(defaultArticleState.fontColor);
	const [selectedBackgroundColorOption, setSelectedBackgroundColorOption] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedSizeOption, setSelectedSizeOption] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef(null);

	const toogleForm = () => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const handleApply = () => {
		const newState: ArticleStateType = {
			fontFamilyOption: selectedFontFamilyOption,
			fontSizeOption: selectedFontSizeOption,
			fontColor: selectedFontColorOption,
			backgroundColor: selectedBackgroundColorOption,
			contentWidth: selectedSizeOption,
		};
		onApply(newState);
		setIsMenuOpen(false);
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

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={toogleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.topMargin}>
						<Select
							selected={selectedFontFamilyOption}
							options={fontFamilyOptions}
							placeholder={`${
								selectedFontFamilyOption?.title ?? 'Выберите шрифт'
							}`}
							onChange={setSelectedOption}
							title='Шрифт'
						/>
					</div>
					<div className={clsx(styles.topMargin)}>
						<RadioGroup
							name='fontStyles'
							options={fontSizeOptions}
							selected={selectedFontSizeOption}
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
						<Button
							title='Сбросить'
							htmlType='reset'
							onClick={handleReset}
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
