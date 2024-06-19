const getHomeRoute = (role: string) => {
  if (role === "customer") return "/";
  else if (role === "admin") return "/dashboard";
  else return "/dashboard";
};

export default getHomeRoute;
