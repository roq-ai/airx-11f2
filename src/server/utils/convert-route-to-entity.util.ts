const mapping: Record<string, string> = {
  airlines: 'airline',
  flights: 'flight',
  passengers: 'passenger',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
