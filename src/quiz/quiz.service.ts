import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { TakeQuizDto } from '../dto/take-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    const { title, questions } = createQuizDto;

    const quiz = await this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions,
        },
      },
      include: {
        questions: true,
      },
    });

    return quiz;
  }
  async takeQuiz(takeQuizDto: TakeQuizDto) {
    const { quizId, userId, answers } = takeQuizDto;

    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    let score = 0;

    for (const question of quiz.questions) {
      if (answers[question.id] === question.correctOption) {
        score++;
      }
    }

    await this.prisma.score.create({
      data: {
        score,
        user: { connect: { id: userId } },
        quiz: { connect: { id: quizId } },
      },
    });

    return { score };
  }
}
