export class TakeQuizDto {
    quizId: string;
    userId: string;
    answers: { [questionId: string]: number };
  }

