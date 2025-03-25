import StyledNavLink from "StyledComponents/StyledNavLink";

const NavButton: React.FC<{ href: string; text: string }> = ({
  href: url,
  text,
}) => {
  return (
    <StyledNavLink to={url}>
      <button>{text}</button>
    </StyledNavLink>
  );
};

export default NavButton;
