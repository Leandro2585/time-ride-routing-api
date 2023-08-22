import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsClient,
  PlaceInputType
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
  constructor(
    private readonly googleMapsClient: GoogleMapsClient,
    private readonly configService: ConfigService
  ) {}

  async findPlace(input: string) {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: this.configService.get('GOOGLE_MAPS_API_KEY')
      }
    });
    return data;
  }
}
