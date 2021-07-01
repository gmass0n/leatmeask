import { Link } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";

import { Container, LeftBox, RightBox } from "./styles";

export const NewRoom: React.FC = () => {
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

          <h2>Criar nova sala</h2>

          <form>
            <input type="text" placeholder="Digite o nome da sala" />

            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </RightBox>
    </Container>
  );
};
