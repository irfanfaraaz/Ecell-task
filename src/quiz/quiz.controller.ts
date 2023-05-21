import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { TakeQuizDto } from 'src/dto/take-quiz.dto';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Post('attempt')
  async takeQuiz(@Body() takeQuizDto: TakeQuizDto) {
    return this.quizService.takeQuiz(takeQuizDto);
  }

}
  