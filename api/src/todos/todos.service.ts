import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
  ) {}
  findAll() { return this.repo.find(); }
  create(title: string) { return this.repo.save({ title }); }
  toggle(id: number) {
    return this.repo.update(id, { done: true });
  }
}
