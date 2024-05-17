# [`useClient`](../../packages/hooks/useQuery.ts#L11)

Hook to use axios client directly with token in the axios header.

## Usage

```js
import { useClient } from "@pkg/hooks/useQuery";

const client = useClient()

client('/api/config')
 .then(() => /* Handle Success */)
 .catch(() => /* Handle Reject */)
```

## Props

| Name | Type | Default | Description |
| :--- | :--- | :------ | :---------- |
|      |      |         |

## Return

a function to do the [request](../../packages/utils/request.ts)

## Notes

- In client-side, suggest to use `useClient` over `request` as it handle token authentication.
- It will attach token from global state and attach automactically to `request` and remove the token if the status code return 401.
- Configure `NEXT_PUBLIC_BASIC_AUTH_TOKEN` and `NEXT_PUBLIC_API_ENDPOINT` in the environment before using `useClient`

  <br/> <br/>

# [`useFetch`](../../packages/hooks/useQuery.ts#L27)

Hook to fetch data from backend. Default method is `GET`.

## Usage

```js
import { useFetch } from '@pkg/hooks/useQuery'

const { data, error, isPending, ...UseQueryResult } = useFetch('/api/config')
```

## Props

| Name                      | Type                                                                         | Default       | Description                                                                                  |
| :------------------------ | :--------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------- |
| url                       | string                                                                       | None          | relative url to `NEXT_PUBLIC_API_ENDPOINT` or absolute url to get data                       |
| config?                   | [AxiosRequestConfig](../../packages/utils/request.ts) + Additional Parameter | None          | Config for axios request and key for Tenstack `useQuery`                                     |
| config?.key               | string                                                                       | URL + payload | key for caching and invalidation                                                             |
| config?.includeStatusCode | boolean                                                                      | false         | setting to get axios response directly with included status code or axios response data only |
| options                   | [UseQueryOptions](../../packages/hooks/useQuery.ts#L3)                       | None          | options for Tenstack `useQuery`                                                              |

## Notes

- If the backend dev don't return the standard xml error status code 500, 400, we will need to extend ResponseError with custom types in order to fulfill the requirement of backend dev.

  <br/> <br/>

# [`useMutate`](../../packages/hooks/useQuery.ts#L47)

Hook to send "POST" request to the backend

## Usage

```js
const { mutate, ...UseMutationResult } = useMutate()

const handleSubmit = () => {
  const data = {
    name: 'Testing',
  }
  mutate({
    url: '/api/submit',
    payload: {
      ...data,
    },
  })
}
```

## Props

| Name                   | Type                                              | Default | Description                                 |
| :--------------------- | :------------------------------------------------ | :------ | :------------------------------------------ |
| options                | [MutateOptions](../../packages/hooks/useQuery.ts) | None    | options to configure Tenstack `useMutation` |
| options.invalidateUrls | string[]                                          | None    | configure invalidation                      |

## Notes

- Default method will be `POST`
- This function will handle the invalidation for `react-query` also
