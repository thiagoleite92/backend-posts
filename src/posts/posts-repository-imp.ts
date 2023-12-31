import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts-repository';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post-dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsRepositoryImp implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async save(post: CreatePostDto): Promise<{ message: string }> {
    await this.prisma.post.create({ data: post });
    return { message: 'Post criado.' };
  }

  async findById(postId: string): Promise<Post> {
    return this.prisma.post.findFirst({
      where: { id: postId },
      include: { User: { select: { name: true } } },
    });
  }

  async update(
    postId: string,
    { title, text }: UpdatePostDto,
  ): Promise<{ message: string }> {
    await this.prisma.post.update({
      where: { id: postId },
      data: { title, text },
    });

    return { message: 'Post atualizado.' };
  }

  async delete(postId: string): Promise<void> {
    await this.prisma.post.delete({ where: { id: postId } });
    return;
  }

  async getAll(orderBy?: string, userId?: any): Promise<Post[] | null> {
    return this.prisma.post.findMany({
      ...(userId.userId && { where: userId }),
      orderBy: { createdAt: orderBy === 'true' ? 'desc' : 'asc' },
      include: { User: { select: { name: true, id: true } } },
    });
  }

  async findPostByTitle(title: string): Promise<Post | null> {
    return this.prisma.post.findFirst({ where: { title } });
  }
}
