import { createServerFn } from "@tanstack/react-start";

export const getDashboardSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  const { getDashboardData } = await import("../dashboard-data.server");
  return getDashboardData();
});
