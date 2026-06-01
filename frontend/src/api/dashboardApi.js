import api from "../services/axiosClient";

export const getDashboard = () =>
  api.get("/dashboard/");