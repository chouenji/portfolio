import { useRef } from 'react';
import pp from '@assets/pp.jpg';
import '@styles/introduction.css';
import { Button, Image, Link } from '@nextui-org/react';
import useAnimation from 'src/utils/slideAnimation';

export default function Introduction() {
  const introRef = useRef(null);

  useAnimation(introRef);

  return (
    <div
      id="home"
      ref={introRef}
      className="section flex flex-col items-center justify-center gap-2 min-h-screen"
    >
      <Image
        className="w-72 h-72 rounded-full border-black border-4"
        src={pp}
        alt="Profile"
      />
      <h1 className="text-2xl md:text-2xl lg:text-xl xl:text-4xl font-bold">
        Hello, I'm Kevin do Canto
      </h1>

      <p className="text-xl md:text-2xl font-semibold">
        I'm a Full Stack Developer
      </p>
      <Button
        as={Link}
        href="mailto:kevin.docanto460@gmail.com"
        className="text-2xl p-6 bg-black text-white mt-4 mb-4 font-semibold"
        variant="flat"
      >
        Contact Me
      </Button>
      <br />
    </div>
  );
}
