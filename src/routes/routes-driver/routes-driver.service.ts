import { Injectable } from '@nestjs/common';
import { doesNotReject } from 'assert';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrUpdate(dto: { route_id: string, lat: number, lng: number }) {
    // const countRouteDriver = await this.prismaService.route_driver.cound({
    //   where: {
    //     route_id: dto.route_id
    //   }
    // })
    this.prismaService.route_driver.upsert({
      includes: {
        route: true
      },
      where: {
        route_id: dto.route_id
      },
      create: {
        route_id: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng
            }
          }
        }
      },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng
            }
          }
        }
      }
    })
  }
}
