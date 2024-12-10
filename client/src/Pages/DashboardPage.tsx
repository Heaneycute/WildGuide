import { Box, Typography, Paper } from "@mui/material";
import { useAppSelector } from "../Redux/hooks";
import dayjs from "dayjs";
import {
  dashboardContainerStyles,
  dashboardGridStyles,
  commonBoxStyles,
  cardsGridStyles,
  dashboardCardStyles,
} from "../Styles/DashboardPage.styles";

export default function Dashboard() {
  const events = useAppSelector((state) => state.calendar.events);

  const upcomingEvent = events
    .filter((event) => dayjs(event.date).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0];

  return (
    <Box sx={dashboardContainerStyles}>
      <Box sx={dashboardGridStyles}>
        <Paper sx={commonBoxStyles}>
          <Typography variant="h4" color="#ffffff">
            Карта
          </Typography>
        </Paper>
        <Box sx={cardsGridStyles}>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Форум
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Общение и обмен опытом
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Календарь
            </Typography>
            {upcomingEvent ? (
              <Typography
                variant="body2"
                color="#ffffff"
                align="center"
                sx={{ marginTop: "0.5rem" }}
              >
                {`Ближайшее событие: ${upcomingEvent.title}`}
                <br />
                {`Дата: ${dayjs(upcomingEvent.date).format("DD.MM.YYYY")}`}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="#ffffff"
                align="center"
                sx={{ marginTop: "0.5rem" }}
              >
                Нет ближайших событий
              </Typography>
            )}
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Погода
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Прогноз погоды
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Оружие
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Выбранное оружие и переход в каталог
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Животные
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Выбранное животное для охоты и следы и проее переход на
              характеристики
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Магазин
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Снаряжение аренда обмен и прочее
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
