# `$project_name`

## System

- NodeJS v20+
- Yarn for package management. _[ Note: Only use yarn for package management ]_
- VSCode for IDE

## Workflow

![Workflow overview](/.github/assets/workflow.png)

- `main`: Production deployment
- `staging`: Pre-release deployment
- `develop`: Continuous development and merging new features.
- `feat/*`: Common features to be used on both CMS and Web.
- `bugfix/*`: Common bugfix to be done on both CMS and Web.

### Web development

- `feat-web/*`: New Web features.
- `bugfix-web/*`: Bugfix Web.

### CMS development

- `feat-cms/*`: New CMS features.
- `bugfix-cms/*`: Bugfix CMS.

### Notes

- Pull `main` into your branches regularly.
- Never pull `develop` into your branches.
- Keep your local repo up-to-date with origin.

## Deployment

We use **AWS Amplify** over traditional **EC2** for cost and performance advantages. There should be only two amplify instances, one for **Web** and other for **CMS**. Most DNS servers, don't allow root domain to connect with **CName**. However, the domain management in Amplify take care of the problem in most case. But if you have a special case, ask for help in `#frontend-developers` or dev-sync meeting.

## Sitemap and robots

- For Web, the `sitemap.xml` & `robots.txt` will be automatically added for all pages using [`next-sitemap`](https://www.npmjs.com/package/next-sitemap). The `robots.txt` automatically disable all pages from ranking in SEO for staging environment.
- For CMS, there is no need for `sitemap.xml` and `robots.txt` already disable all pages from ranking in SEO.

## Import Alias

### `@pkg`

All packages inside `/packages/*` must be imported using `@pkg` alias.

```jsx
/* apps/web/pages/index.tsx */

// Don't ❌
import Image from '../../../packages/components/Image'
import useQuery from '../../../packages/hooks/useQuery'

// Do this ✅
import Image from '@pkg/components/Image'
import useQuery from '@pkg/hooks/useQuery'
```

### `@web`

All files inside `/apps/web` must be imported using `@web` alias.

```jsx
/* apps/web/pages/index.tsx */

// Don't ❌
import Button from '../components/Button'
import useProfile from '../hooks/useProfile'

// Do this ✅
import Button from '@web/components/Button'
import useProfile from '@web/hooks/useProfile'
```

### `@cms`

All files inside `/apps/cms` must be imported using `@cms` alias.

```jsx
/* apps/cms/pages/index.tsx */

// Don't ❌
import Button from '../components/Button'
import useProfile from '../hooks/useProfile'

// Do this ✅
import Button from '@cms/components/Button'
import useProfile from '@cms/hooks/useProfile'
```

## Communication

### With Design Team

- Ask the design team to provide the assets like favicon and `og:image`.
- The design frame should be `375px` for mobile and `1024px` for desktop.
- There should be only two typography per project, one is `title-*` and `body-*`. If there is more than two typography please ask design team to remove those and extend it as a variant into `title-*` & `body-*` or attach it to the Figma component instance.
- Ask the design team to organize all of their icons, components, typographies and colors in a single place and always update as project grows.
- Don't allow unnamed colors unless it's a brand color of other services.
- Please ask the designer for `Button`'s `hover`, `active`, `loading` and `disable` state designs.
- When including lottie animations, always ask for dotLottie(light in size) files. Then use the `@web/components/Lottie`.

### With Client Team

- Always ask for SEO title and description for each public pages.

### With Other Developers

- If you have already added a component or icon from Figma to Codebase, please comment the file location above the component in Figma. So that other developer won't rebuild the same component and waste time.
- If you think the design has some mistake or diverge from business logic, please make sure with BE devs, PMs and designers before developing it. It's not only the responsibility of design team to carry the business logic all the time alone.

### With Project Manager and Tech Leads

- If the UI has been changed after you started the development, please inform them. But don't go too far for small changes.
- If you think you won't be able to finish the task on time, please inform them early. So that they can plan for alternate solutions.
- Always discuss with them about which web hosting service will be used since some services are new to us and can take time.
