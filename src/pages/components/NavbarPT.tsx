import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import eng from '@assets/england.png';

export default function DisplayNavbar({
  secondaryLayoutUrl,
}: {
  secondaryLayoutUrl: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const menuItems = ['Início', 'Sobre', 'Projetos'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let foundActive = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            foundActive = true;
          }
        });

        // If no section is intersecting, reset activeSection
        if (!foundActive) {
          setActiveSection('');
        }
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleMobileMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  function redirectToSecondaryLayout() {
    window.location.href = secondaryLayoutUrl;
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <Navbar
      className={`dark text-foreground bg-background ${
        visible ? 'opacity-100 transition ease-in' : 'opacity-0'
      }`}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link
            color={activeSection === 'início' ? 'warning' : 'foreground'}
            href="#início"
          >
            Início
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link
            color={activeSection === 'sobre' ? 'warning' : 'foreground'}
            href="#sobre"
          >
            Sobre
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={activeSection === 'projetos' ? 'warning' : 'foreground'}
            href="#projetos"
          >
            Projetos
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Button
            target="_blank"
            as={Link}
            href="https://github.com/chouenji"
            variant="flat"
          >
            Github
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            target="_blank"
            as={Link}
            href="https://www.linkedin.com/in/kevindocanto/"
            variant="flat"
          >
            Linkedin
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Avatar
            className="cursor-pointer hover:opacity-80"
            isBordered
            color="danger"
            src={eng}
            alt="Português"
            onClick={redirectToSecondaryLayout}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full justify-center text-4xl p-4"
              color="foreground"
              href={`#${item.toLowerCase()}`}
              onClick={handleMobileMenuItemClick}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
