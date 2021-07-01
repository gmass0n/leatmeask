import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";

import {
  Container,
  LeftBox,
  RightBox,
  CreateRoomButton,
  Separator,
} from "./styles";

export const Home: React.FC = () => {
  return (
    <Container>
      <LeftBox>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />

        <strong>Crie salas de Q&amp;A ao-vivo</strong>

        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </LeftBox>

      <RightBox>
        <div>
          <img src={logoImg} alt="Letmeask" />

          <CreateRoomButton type="button">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </CreateRoomButton>

          <Separator>ou entre em uma sala</Separator>

          <form>
            <input type="text" placeholder="Digite o código da sala" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </RightBox>
    </Container>
  );
};
