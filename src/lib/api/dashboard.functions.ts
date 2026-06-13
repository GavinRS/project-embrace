import { createServerFn } from "@tanstack/react-start";

import { getDashboardData } from "../dashboard-data.server";

export const getDashboardSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  return getDashboardData();
});
