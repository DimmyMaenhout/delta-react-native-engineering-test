# Overview

React Native project built with **Expo** and navigation is handled by **Expo Router**

The project contains the following folders:
- app (screens & routes)
- components (reusable components)
- api (http client and endpoints)
- hooks (custom hook for infinite scrolling using TanStack Query)
- models (all the models used to represent the data we get from the API)
- util (helper to format a date)

to keep the codebase organized.

## State Management and API layer

TanStack Query because it provides
 - caching
 - loading & error states

Otherwise to get this functionality (isLoading, error, data) we should've written a custom hook where we used **useState** and **useEffect** to keep track of the loading/error/data.

Axios is used to create a reusable HTTP client.
 - baseURL configuration
 - timeouts
 - possibility to add interceptors
 - cleaner API
A generic request function is used to reduce duplicate code

## Navigation
Expo Router uses react-navigation under the hood but uses a file based system like Next.js

## Data Flow
Data is fetched from the API through the axios client which is managed by TanStack Query for caching and statehandling and will be shown on the screen

API --> axios client --> TanStack Query --> screen
