type LayoutProps = {
  children: React.ReactNode;
  styles?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, styles }) => {
  return (
    <div
      className={`${styles} w-full flex flex-col gap-y-4 justify-center items-center`}
    >
      {children}
    </div>
  );
};

export default Layout;
