"use client";

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
import { CheckCircle, Cancel, Code } from "@mui/icons-material";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Code sx={{ fontSize: 48, color: "primary.main" }} />
        </Box>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800, mb: 2 }}
        >
          TanStack Query Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          캐시 무효화 전략 비교 데모
        </Typography>
        <Alert severity="info" sx={{ textAlign: "left" }}>
          <Typography variant="body2">
            이 데모는 TanStack Query (React Query)의 캐시 무효화 전략을
            비교합니다. 각 버전에서 사용자 정보를 수정하고 목록 페이지로 돌아가
            차이를 확인해보세요.
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
                  label="동기 무효화"
                  color="error"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Mutation 후 캐시를 무효화하지만, 자동 리페치가 되지 않습니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ❌ 변경사항이 즉시 반영되지 않음
                  <br />❌ 페이지 새로고침 필요
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
                  label="비동기 무효화 + refetchType: all"
                  color="success"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Mutation 후 캐시를 무효화하고 모든 쿼리를 즉시 재실행합니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✅ 변경사항 즉시 반영
                  <br />✅ 자동 리페치로 최신 상태 유지
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
