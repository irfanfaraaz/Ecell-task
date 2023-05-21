import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserScores(userId: string) {
    return this.prisma.score.findMany({
      where: { userId },
      include: { quiz: true },
    });
  }

  async getLeaderboard() {
    return this.prisma.score.findMany({
      include: { quiz: true, user: true },
      orderBy: { score: 'desc' },
    });
  }
}
