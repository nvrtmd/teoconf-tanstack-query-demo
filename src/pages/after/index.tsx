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
  Box,
  Button,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useSuspenseGetUserList } from "@/queries/user";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
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
          유저 목록 (After)
        </Typography>
        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>해결 완료:</strong> await로 invalidateQueries 완료를
            보장하여 유저 정보 수정 후 다시 페이지를 방문하면 최신 데이터(수정된
            닉네임, 역할)가 즉시 표시됩니다.
          </Typography>
        </Alert>
      </Box>

      <Suspense fallback={<LoadingSpinner />}>
        <UserList />
      </Suspense>
    </Container>
  );
}
