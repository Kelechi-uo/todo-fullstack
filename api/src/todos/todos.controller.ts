import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}
  @Get() list() { return this.service.findAll(); }
  @Post() add(@Body('title') title: string) {
    return this.service.create(title);
  }
  @Put(':id/done') markDone(@Param('id') id: string) {
    return this.service.toggle(+id);
  }
}
