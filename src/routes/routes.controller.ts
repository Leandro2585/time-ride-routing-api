import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';
import { RouteSerializer } from './route.serializer';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  async findAll() {
    const routes = await this.routesService.findAll();
    return routes.map((route) => new RouteSerializer(route));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const route = await this.routesService.findOne(id);
    return new RouteSerializer(route);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
