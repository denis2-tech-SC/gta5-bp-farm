# GTA 5 RP — Bonus Points Tracker

Одностраничный трекер заданий Bonus Points для GTA 5 RP.

## Запуск

```bash
npm install
npm run dev
```

## Добавление заданий

Отредактируйте массив `questCategories` в файле `src/data/quests.ts`:

```ts
{
  category: "Легкие",
  quests: [
    { title: "Купить лотерейный билет", bp: 1 },
    { title: "Посетить любой сайт в браузере", bp: 1 },
  ],
}
```

## Стек

- React + TypeScript
- Tailwind CSS v4
- Vite
- localStorage для сохранения прогресса
