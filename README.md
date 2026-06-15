## Установка зависимостей

```
npm install
```

## Запуск dev-сервера

```
npm run dev
```

## Сборка

```
npm run build
```

## Проверки качества кода

```
npm run check
```

## Исправление ошибок

```
npm run fix
```

## Запуск Storybook

```
npm run storybook
```

## Проверка тестами (Jest + React Testing Library)

```
npm run test
```

## Архитектура

- api — методы работы с мок-JSON (axios/fetch)
- app — инициализация, провайдеры, глобальные стили
- entities — модели домена (Skill, User, Request)
- features — бизнес-логика (auth, skills, favorites, requests)
- widgets — готовые фич-блоки (SkillCard, FiltersBar)
- pages — страницы/роуты (главная, профиль, skill, favorites)
- shared — переиспользуемые UI, hooks и lib
