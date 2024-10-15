# Проектная работа: Вёрстка проекта

Стек: HTML, SCSS, TS, TSX, React, Webpack, Storybook, ESLint, Prettier, Stylelint, husky, sass, cssnano

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды для установки зависимости и запуска проекта в режиме разработки, соответственно.

```
npm install
npm run start
```

или

```
yarn
yarn start
```

Для запуска Storybook выполните:

```
npm run storybook
```

Для запуска линтера для стилей выполните:

```
npm run stylelint
```

Для запуска линтера выполните:

```
npm run lint
```

Для запуска форматтера выполните:

```
npm run format
```

## Задача проектной работы

Необходимо добавить компоненты состояния и обработчики событий, корректно передать данные между компонентами в незаконченном коде.

---

### Компонент ArticleParamsForm

Отвечает за составление сайдбара с формой для редактирования параметров страницы со статьей.\
В компонент был добавлен интерфейс:

```
interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
  }
```

Сам компонент принимает в качестве параметров состояние стилей статье и страницы, и обработчики событий. В полях содержатся хук useState для перезаписи и сохранения состояния статьи, имеет для каждого элемента страницы стандартное значение стиля. Так же имеется поле для сохранения состояния сайдбара на странице с помощью хука. Закрытие сайдбара происходит по нажатию на кнопку со стрелочкой, на сабмит кнопки "применить", на нажатие по области просмотра, вне сайдбара.\
Функционал компонента содержит в себе функции:

- toogleForm - переключает состояние открытия сайдбара;
- handleApply - обрабатывает нажатие на кнопку "Применить";
- handleReset - обрабатывает нажатие на кнопку "Сбросить";
- useEffect - сохраняет стандартное состояние элементов статьи при сбрасывании настроек.

Компонент возвращает JSX разметку для монтирования в дерево DOM.

---

### Компонент App

Отвечает за отрисовку страницы со статьей. Содержит в поле хук useState для хранения состояния страницы./
Функционал компонента содержит в себе функции:

- applyChanges - обрабатывает нажатие на кнопку "Применить", сохраняет предыдущие значения элементов страницы и новые;
- resetChanges - обрабатывает нажатие на кнопку "Сбросить", возвращает настройки по умолчанию;

Компонент возвращает JSX разметку для монтирования в дерево DOM.
