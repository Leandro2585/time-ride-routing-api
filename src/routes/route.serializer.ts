import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';
import { route as Route } from '@prisma/client';

export class RouteSerializer implements Omit<Route, 'directions'> {
  id: string;
  name: string;
  source: { name: string; location: { lat: number; lng: number } };
  destination: { name: string } & { location: { lat: number; lng: number } };
  directions: DirectionsResponseData & { request: any };
  distance: number;
  duration: number;
  created_at: Date;
  updated_at: Date;

  constructor(route: Route) {
    this.id = route.id;
    this.name = route.name;
    this.source = route.source;
    this.destination = route.destination;
    this.directions = JSON.parse(route.directions as string);
    this.distance = route.distance;
    this.duration = route.duration;
    this.created_at = route.created_at;
    this.updated_at = route.updated_at;
  }
}
