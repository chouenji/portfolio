import { useRef } from 'react';
import pp from '@assets/pp.jpg';
import '@styles/introduction.css';
import { Button, Link } from '@nextui-org/react';
import slideAnimation from 'src/utils/slideAnimation';

export default function Introduction() {
  const introRef = useRef(null);

  slideAnimation(introRef);

  return (
    <div
      id="início"
      ref={introRef}
      className="section flex flex-col items-center justify-center gap-2 min-h-screen"
    >
      <img
        className="w-72 h-72 rounded-full border-black border-4"
        src={pp}
        alt="Perfil"
      />
      <h1 className="text-2xl md:text-2xl lg:text-xl xl:text-4xl font-bold">
        Olá, eu sou Kevin do Canto
      </h1>

      <p className="text-xl md:text-2xl font-semibold">
        Sou um Desenvolvedor Full Stack
      </p>

      <Button
        as={Link}
        href="mailto:kevin.docanto460@gmail.com"
        className="text-2xl p-6 bg-black text-white mt-4 font-semibold"
        variant="flat"
      >
        Contate-me
      </Button>
      <br />
    </div>
  );
}
