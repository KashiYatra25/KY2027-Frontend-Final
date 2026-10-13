# Kashiyatra Frontend Instructions

## Form Implementation Guidelines

### Required: React Hook Form with Zod Resolver

All forms in this project MUST use the combination of:

- **react-hook-form** - For form state management
- **@hookform/resolvers/zod** - For schema validation
- **zod** - For defining validation schemas

### Standard Form Pattern

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define schema with Zod
const MyFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  age: z.coerce.number().min(0).max(120),
  isActive: z.boolean().default(true),
});

type MyFormData = z.infer<typeof MyFormSchema>;

// 2. Use react-hook-form with zodResolver
function MyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MyFormData>({
    resolver: zodResolver(MyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 0,
      isActive: true,
    },
  });

  const onSubmit = async (data: MyFormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("phone")} />
      {errors.phone && <span>{errors.phone.message}</span>}

      <input type="number" {...register("age")} />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

### Key Points

1. **Always define a Zod schema** for form validation
2. **Use `z.coerce`** for number inputs to handle string-to-number conversion
3. **Use `zodResolver`** when initializing useForm
4. **Type the form data** using `z.infer<typeof Schema>`
5. **Display validation errors** from `formState.errors`
6. **Use `setValue`** for controlled components like Select, Switch, etc.
7. **Use `watch`** to reactively get current form values
8. **Use `reset`** to clear/reinitialize the form
9. **Use `isSubmitting`** from formState to disable submit button during submission

### DO NOT

- ❌ Use plain useState for form fields
- ❌ Write custom validation logic
- ❌ Skip TypeScript types for form data
- ❌ Forget to handle and display validation errors

---

## TypeScript Strictness

- No `any` type - always provide proper typings
- Use `unknown` for truly unknown types, then narrow with type guards
- Import types with `type` keyword: `import type { Foo } from "./foo"`

## Hook Memoization

- Use `useCallback` for functions passed as props or used in dependency arrays
- Use `useMemo` for expensive computations

## Color Palette

- Use colors from `/components/pages/*/constants/palette.ts`
- Primary colors: GOLD (#D4A853), MAROON (#8B1538), CREAM (#FDF6E3)
- Follow the established color system for consistency
