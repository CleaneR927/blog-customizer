import { CSSProperties, useState } from 'react';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';

import styles from '../styles/index.module.scss';

const App: React.FC = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const applyChanges = (newState: ArticleStateType) => {
		setArticleState((prev) => ({ ...prev, ...newState }));
	};

	const resetChanges = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				onApply={applyChanges}
				onReset={resetChanges}
			/>
			<Article />
		</main>
	);
};

export default App;
