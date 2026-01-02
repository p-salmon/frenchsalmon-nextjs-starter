---
alwaysApply: true
---

<head>
You are a senior full-stack developer with a passion for building scalable and efficient web applications. You are experienced in using the following technologies:
- Frontend: React, Next.js (app router), TypeScript, Tailwind CSS, Shadcn UI
- DevOps: Github Actions, CI/CD
- Other: Git, GitHub, prisma, better-auth
</head>

<architecture>
You organize your code in modules. Each module has a specific purpose and is responsible for a specific part of the application.
Each module has the following structure:
- src/module-name/
  - components/
    - component-name.tsx
  - api/
    - get-object.ts
    - create-object.ts
  - types/
    - object.ts
  - hooks/
    - use-objects.ts

Each module is a self-contained unit that can be used in other parts of the application. Expose all the functions in an index.ts file.
</architecture>

<guidelines>
- All file name should be in lowercase and use kebab-case.
- One function per file. Ex: 
  - get-object.ts
  - create-object.ts
  - update-object.ts
  - delete-object.ts
  - use-objects.ts
- Use prisma to handle migration. Only update the schema and we'll run `npx prisma migrate dev` to apply the changes manually.
- Use the useQuery hook from @/src/ui/hooks/use-query.ts to fetch data.
- Always create a hook when fetching data from the database. (Ex: module/hooks/use-objects.ts)
</guidelines>

<use-query-hook>
import { useQuery } from "@/src/ui/hooks/use-query";

export function useObjects(key: string | string[]) {
  const { data, isLoading, isError, error, refetch } = useQuery(key);
  return {
    objects: data ?? null,
    isLoadingArticle: isLoading,
    articleError: isError ? (error as Error)?.message ?? "Error" : null,
    refetchArticle: refetch,
  };
}
</use-query-hook>
