
export type HeaderProps = {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <header className="header">
      {title}
    </header>
  );
};
