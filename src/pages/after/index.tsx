"use client";

import Link from "next/link";
import { Suspense } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Chip,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBack, Person } from "@mui/icons-material";
import { useSuspenseGetUserList } from "@/queries/user";

const roleColors = {
  admin: "error" as const,
  editor: "warning" as const,
  viewer: "info" as const,
};

const roleLabels = {
  admin: "관리자",
  editor: "편집자",
  viewer: "뷰어",
};

function UserList() {
  const [userList] = useSuspenseGetUserList();

  if (!userList || userList.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        사용자가 없습니다.
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {userList.map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <Card
            elevation={2}
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea
              component={Link}
              href={`/after/${user.id}`}
              sx={{ height: "100%", p: 2 }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: "success.main",
                      fontSize: "1.5rem",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="h6"
                    component="div"
                    textAlign="center"
                    sx={{ fontWeight: 600 }}
                  >
                    {user.name}
                  </Typography>
                  <Chip
                    label={roleLabels[user.role]}
                    color={roleColors[user.role]}
                    size="small"
                    icon={<Person />}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function LoadingState() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 300,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}

export default function UserListPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          variant="outlined"
          color="success"
          sx={{ mb: 3 }}
        >
          홈으로 돌아가기
        </Button>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          사용자 목록 (After)
        </Typography>
        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>After 버전:</strong> 사용자 정보를 수정한 후 목록 페이지로
            돌아오면 변경사항이 자동으로 반영됩니다! 캐시 무효화와 자동 리페치를
            통해 항상 최신 데이터를 표시합니다.
          </Typography>
        </Alert>
      </Box>

      <Suspense fallback={<LoadingState />}>
        <UserList />
      </Suspense>
    </Container>
  );
}
