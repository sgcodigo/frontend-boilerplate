## Components

### Libraries

[`radix-ui`](https://www.radix-ui.com/), [`react-select`](https://react-select.com/), [`react-datepicker`](https://reactdatepicker.com/), [`react-fast-marquee`](https://www.react-fast-marquee.com/), [`react-flagkit`](https://www.npmjs.com/package/react-flagkit), [`swiper`](https://swiperjs.com/), [`renex`](https://www.npmjs.com/package/renex).

### Location

- **Basic components** like `Button` & `Input` must be inside `apps/web/components`. If you think the component will be also useful in CMS portal, please move to `packages/components`.

- **Single instance components**(components that will be called once for entire website) like `Header` & `Footer` must be inside `apps/web/layouts`.

- **Module base components**(components that are part of a module) like `HeroSection` in Home or `PricingCard` in Pricing must be declared inside `apps/web/$module`.

## Styling

We use utilities styling over componenets styling for smaller bundle size.

### Libraries

[`tailwindcss@v3.4`](https://tailwindcss.com/), [`tailwindcss-radix`](https://www.npmjs.com/package/tailwindcss-radix)

### Location

All the styles must be delcared inside `/apps/web/styles/index.css`. For keyframes, please delcare inside `/app/web/styles/keyframes.css`.

### Libraries

[`typescript@5.3`](https://www.typescriptlang.org/), [`ts-reset`](@total-typescript/ts-reset)

### Location

- Business related types must be delcared inside `apps/web/types/$module.ts`.
- Global declaration (e.g declaring a module or a globally used types) must be declared inside `apps/web/types/global.d.ts`. Don't declare business related types as global.

## Hooks

### Libraries

[`mantine-hooks`](https://mantine.dev/hooks/use-click-outside/)

### Location

All the hooks must be only inside `apps/web/hooks`. If the hook seems to be useful in both Web and CMS, please move to `packages/hooks`. It's better to have only single hook per file. Don't create hooks inside the `views/$module` even if it's only related to a specific module.

## State management

### Libraries

[`recoil`](https://recoiljs.org/), [`recoil-persist`](https://www.npmjs.com/package/recoil-persist)

### Location

All the states should be declared only inside `apps/web/states`. If the states seems to be useful in CMS portal as well(e.g.`tokenState`), please move to `packages/states`. Always group your states by module, e.g. all booking related states inside states/booking.ts.

## Utilities

### Libraries

[`lodash`](https://lodash.com/), [`date-fns`](https://www.npmjs.com/package/date-fns), [`country-calling-code`](https://www.npmjs.com/package/country-calling-code)

### Location

Unlike components and hooks, utils must be always declared inside `packages/utils/*` for both Web and CMS. Always group your utils, e.g, all date related utils must be delcared inside `packages/utils/date.ts`. If you can't find a common group name for utils, please put inside `packages/utils/index.ts`. Store project related constants on `packages/utils/consts/`.
