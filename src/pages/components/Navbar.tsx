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

export default function DisplayNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState('');

  const menuItems = ['Home', 'About', 'Projects'];

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

    console.log(activeSection);

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });
    console.log(sections);

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleMobileMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      className="dark text-foreground bg-background"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link
            color={activeSection === 'home' ? 'warning' : 'foreground'}
            href="#home"
          >
            Home
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link
            color={activeSection === 'about' ? 'warning' : 'foreground'}
            href="#about"
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={activeSection === 'projects' ? 'warning' : 'foreground'}
            href="#projects"
          >
            Projects
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
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={`#${item.toLowerCase()}`}
              onClick={handleMobileMenuItemClick} // Add this click event handler
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}