import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Chip,
  Alert,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ pt: 10, height: "100vh" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800, mb: 2 }}
        >
          TanStack Query 데모
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          캐시 갱신 문제와 해결 과정
        </Typography>
        <Alert severity="info" sx={{ textAlign: "left" }}>
          <Typography variant="body2">
            TanStack Query의 캐시 갱신 문제를 해결하는 과정을 체험해보세요.
          </Typography>
        </Alert>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
            }}
          >
            <CardActionArea
              component={Link}
              href="/before"
              sx={{ height: "100%", p: 3 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Cancel sx={{ fontSize: 40, color: "error.main", mr: 2 }} />
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 700 }}
                  >
                    Before
                  </Typography>
                </Box>
                <Chip
                  label="문제 상황"
                  color="error"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  invalidateQueries가 비동기적으로 실행되어 캐시 갱신이 완료되기
                  전에 페이지가 이동합니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ❌ tRPC의 abortOnUnmount 옵션으로 인해 캐시 갱신 중 요청이
                  취소됨
                  <br />❌ 수정 전 데이터가 잠깐 노출됨
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
            }}
          >
            <CardActionArea
              component={Link}
              href="/after"
              sx={{ height: "100%", p: 3 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle
                    sx={{ fontSize: 40, color: "success.main", mr: 2 }}
                  />
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 700 }}
                  >
                    After
                  </Typography>
                </Box>
                <Chip
                  label="해결 후"
                  color="success"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  await로 invalidateQueries 완료를 보장하여 캐시 갱신 후
                  페이지를 이동합니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✅ 페이지 이동 전에 캐시 갱신이 완료됨
                  <br /> ✅ 최신 데이터가 즉시 표시됨
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
