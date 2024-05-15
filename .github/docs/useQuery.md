# `$hooks/useQuery/useClient`

Hook to use axios client directly with token in the axios header. 

## Usage
```
const client = useClient(); 
```

## Props

| Name | Type | Default | Description 
| :--- | :--- | :------ | :----------
|  |  |  | 


## Notes
If is there any notes please put that here as `bullets`.

# `$hooks/useQuery/useFetch`

Hook to send "GET" request to the backend

## Usage
```
const query = useQuery('/api/config'); 
```

## Props

| Name | Type | Default | Description 
| :--- | :--- | :------ | :----------
| url | string | None | Backend API URL
| config? | AxiosRequestConfig + Additional Parameter | None | Config for axios request and tenstack useQuery
| config?.key | string | URL + payload | Key for tenstack useQuery for the cache
| config?.includeStatusCode | TIncludeCode | false | setting to get axios response directly with included status code or axios response data only


## Notes
- 
