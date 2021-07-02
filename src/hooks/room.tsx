import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

interface QuestionAuthor {
  name: string;
  avatar: string;
}

interface QuestionProps {
  id: string;
  author: QuestionAuthor;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

type FirebaseQuestions = Record<string, Omit<QuestionProps, "id">>;

interface FirebaseRoom {
  questions: FirebaseQuestions;
  authorId: string;
  title: string;
}

interface UseRoomResponse {
  title: string;
  questions: QuestionProps[];
  isLoading: boolean;
}

export const useRoom = (roomId: string): UseRoomResponse => {
  const toast = useToast();
  const history = useHistory();

  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const roomRef = database.ref(`rooms/${roomId}`);

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
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          } as QuestionProps;
        }
      );

      setIsLoading(false);
      setTitle(firebaseRoom.title);
      setQuestions(parsedQuestions);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return {
    questions,
    title,
    isLoading,
  };
};
