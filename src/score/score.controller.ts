import { Controller, Get, Param } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':userId')
  async getUserScores(@Param('userId') userId: string) {
    return this.scoreService.getUserScores(userId);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.scoreService.getLeaderboard();
  }
}
