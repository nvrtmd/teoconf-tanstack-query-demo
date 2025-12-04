import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useSuspenseGetUser, useUpdateUserAfter } from "@/queries/user";
import { Suspense } from "@suspensive/react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import type { SubmitHandler } from "react-hook-form";
import { userFormSchema } from "@/server/fixtures";

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  userName: string;
  defaultValues?: UserFormValues;
  onSubmit: SubmitHandler<UserFormValues>;
  isPending: boolean;
}

function UserForm({
  userName,
  defaultValues,
  onSubmit,
  isPending,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormValues>({
    values: defaultValues,
    defaultValues,
    resolver: zodResolver(userFormSchema),
  });
  return (
    <Box sx={{ width: "500px", mx: "auto", p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          유저 정보 수정 (After)
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="이름"
            value={userName}
            disabled
            sx={{ mb: 3 }}
            size="medium"
          />

          <TextField
            {...register("nickname")}
            fullWidth
            label="닉네임"
            error={!!errors.nickname}
            helperText={errors.nickname?.message}
            sx={{ mb: 3 }}
            size="medium"
          />

          <FormControl fullWidth error={!!errors.role} sx={{ mb: 4 }}>
            <InputLabel>역할</InputLabel>
            <Select
              value={watch("role") || ""}
              onChange={(e) =>
                setValue(
                  "role",
                  e.target.value as "admin" | "editor" | "viewer",
                  { shouldDirty: true, shouldValidate: true }
                )
              }
              label="역할"
              size="medium"
            >
              <MenuItem value="admin">관리자</MenuItem>
              <MenuItem value="editor">편집자</MenuItem>
              <MenuItem value="viewer">뷰어</MenuItem>
            </Select>
            {errors.role && (
              <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                {errors.role.message}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{ flex: 1, py: 1.5, fontSize: "1rem" }}
              size="large"
            >
              {isPending ? "수정 중..." : "수정"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

function UpdateUserPage({ userId }: { userId: number }) {
  const router = useRouter();
  const [user] = useSuspenseGetUser({ id: userId });
  const { mutate, isPending } = useUpdateUserAfter();

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    const formData = {
      ...data,
      id: userId,
    };
    mutate(
      { id: userId, data: formData },
      {
        onSuccess: () => {
          console.log("Settings saved successfully.");
          router.push("/after");
        },
        onError: () => {
          console.log("Something went wrong. Please try again.");
        },
      }
    );
  };

  if (!user) {
    return <div>No user found</div>;
  }

  const defaultValues: UserFormValues = {
    nickname: user.nickname,
    role: user.role,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <UserForm
        userName={user.name}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </Box>
  );
}

export default function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return <LoadingSpinner fullScreen />;
  }

  const userId = parseInt(id);

  return (
    <Suspense clientOnly fallback={<LoadingSpinner fullScreen />}>
      <UpdateUserPage userId={userId} />
    </Suspense>
  );
}
