import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "./auth";

interface QuestionLike {
  authorId: string;
}

interface QuestionAuthor {
  name: string;
  avatar: string;
}

export interface QuestionProps {
  id: string;
  author: QuestionAuthor;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likesCount: number;
  likeId: string | undefined;
}

type FirebaseLikes = Record<string, QuestionLike>;

interface FirebaseQuestion {
  author: QuestionAuthor;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: FirebaseLikes;
}

type FirebaseQuestions = Record<string, FirebaseQuestion>;

interface FirebaseRoom {
  questions: FirebaseQuestions;
  authorId: string;
  title: string;
  closedAt?: string;
}

interface UseRoomResponse {
  title: string;
  authorId: string;
  questions: QuestionProps[];
  isLoading: boolean;
}

export const useRoom = (roomId: string): UseRoomResponse => {
  const toast = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once("value", (snapshot) => {
      const firebaseRoom = snapshot.val() as FirebaseRoom | null;

      if (firebaseRoom?.closedAt) {
        toast({
          title: "Ops, ocorreu um imprevisto!",
          description:
            "A sala que você está tentando acessar já foi encerrada.",
          status: "error",
          position: "top-right",
          isClosable: true,
        });

        history.push("/");
        return;
      }
    });

    roomRef.on("value", (snapshot) => {
      const firebaseRoom = snapshot.val() as FirebaseRoom | null;

      if (!firebaseRoom || !firebaseRoom.authorId) {
        toast({
          title: "Ops, ocorreu um imprevisto!",
          description: "A sala que você está tentando acessar não existe.",
          status: "error",
          position: "top-right",
          isClosable: true,
        });

        history.push("/");
        return;
      }

      const firebaseQuestions = firebaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          const parsedLikes = Object.values(value.likes ?? {});
          const likeId = Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0];

          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likesCount: parsedLikes.length,
            likeId,
          } as QuestionProps;
        }
      );

      const highlightedQuestions = parsedQuestions.filter(
        (question) => question.isHighlighted && !question.isAnswered
      );
      const answeredQuestions = parsedQuestions.filter(
        (question) => question.isAnswered
      );
      const restQuestions = parsedQuestions.filter(
        (question) => !question.isHighlighted && !question.isAnswered
      );

      setAuthorId(firebaseRoom.authorId);
      setTitle(firebaseRoom.title);
      setQuestions([
        ...highlightedQuestions,
        ...restQuestions,
        ...answeredQuestions,
      ]);
      setIsLoading(false);
    });

    return () => {
      roomRef.off("value");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, user]);

  return {
    questions,
    authorId,
    title,
    isLoading,
  };
};
