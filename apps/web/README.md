## Components

### Libraries

[`radix-ui`](https://www.radix-ui.com/), [`react-select`](https://react-select.com/), [`react-datepicker`](https://reactdatepicker.com/), [`react-fast-marquee`](https://www.react-fast-marquee.com/), [`react-flagkit`](https://www.npmjs.com/package/react-flagkit), [`swiper`](https://swiperjs.com/).

### Location

- **Basic components** like `Button` & `Input` must be inside `apps/web/components`. If you think the component will be also useful in CMS portal, please move to `packages/components`.

- **Single instance components**(components that will be called once for entire website) like `Header` & `Footer` must be inside `apps/web/layouts`.

- **Module base components**(components that are part of a module) like `HeroSection` in Home or `PricingCard` in Pricing must be declared inside `apps/web/$module`.

## Hooks

### Libraries

[`mantine-hooks`](https://mantine.dev/hooks/use-click-outside/)

### Location

All the hooks must be only inside `apps/web/hooks`. If the hook seems to be useful in both Web and CMS, please move to `packages/hooks`. It's better to have only single hook per file. Don't create hooks inside the `views/$module` even if it's only related to a specific module.

## State Management

### Libraries

[`recoil`](https://recoiljs.org/), [`recoil-persist`](https://www.npmjs.com/package/recoil-persist)

### Location

All the states should be declared only inside `apps/web/states`. If the states seems to be useful in CMS portal as well(e.g.`tokenState`), please move to `packages/states`. Always group your states by module, e.g. all booking related states inside states/booking.ts.

## Utilities

### Libraries

[`lodash`](https://lodash.com/), [`date-fns`](https://www.npmjs.com/package/date-fns), [`country-calling-code`](https://www.npmjs.com/package/country-calling-code)

### Location

Unlike components and hooks, utils must be always declared inside `packages/utils/*` for both Web and CMS. Always group your utils, e.g, all date related utils must be delcared inside `packages/utils/date.ts`. If you can't find a common group name for utils, please put inside `packages/utils/index.ts`. Store project related constants on `packages/utils/consts/`.

## Serious Notes

- Don't install a library unless the existing codebase and techstack don't have it. E.g. Don't add [`react-tabs`](https://www.npmjs.com/package/react-tabs) while RadixUI has it's own tab component. Every new libirary added on your own can be a **pain-in-ass** for the next developer.
- If the existing components or functions are missing the feature you need, tweak and improve it. Don't copy existing code and create a new goblin mutant like `Button2`.
- Always use the built-in things provided by libraries. Don't punish yourself and the devs after you by creating own caching mechanism while the TanstackQuery and NextImage provide it already. They know how to handle these sh\*ts better than us.
- Don't disable safety mechanisms likes **typescript, eslint rules & git hooks** even in your local files. Always type your code, most of the devs don't type their data most of the time. We don't expect your code to be 100% typesafe, but we want atleast 85%. You must always type your components props and data returned from API. Don't give project timeline as a excuse since these don't cause huge difference in timeline.
- For images, only use the image from `@pkg/components/Image` or `@pkg/components/Image/Ratio` which are based on `next/image`. Using HTML `<img />` tag is not allowed. Learn how to use `next/image` properly as you are working as a frontend developer with NextJS and not HTML/CSS.
- There must be only two typography for entier website in Figma `title-*` & `body-*`. If there are more than two typography in Figma, ask designer to remove it and extend it to the existing typographies.
- For icons and stickers, only use React components and `.svg` is not allowed. Please put the files to `web/icons/*`.
- Never use `px` units unless it's for border-width or the value is less than `3px`.
- Don't use arbitrary values in tailwind classes unless it doesn't exist in tailwind design system. E.g. `p-[0.25rem]` is not allowed to use since tailwind has `p-1`.

> _P.S If you don't follow these rules, you will be forced to changed your codes with your own personal time to align with these rules._

## Friendly Notes

- Every pages should be wrapped with `@web/components/Page`.

  ```jsx
  // pages/*.tsx
  import { Page } from '@web/components/Page'

  export default function Index() {
    return <Page></Page>
  }
  ```

- Please avoid using global states as much as possible. Try to carry data with URL as it's the standart approach and devs mostly forgot to clear global states when a process is finished.

- Don't always use `div` and `p` alone. There are other elements too. Like `section`, `h1->h6` and `span`.

- Animating components is very easy with `packages/components/Motion`. All you have to do is just replace `div` with `Motion`. So please consider about writing alive web pages.
