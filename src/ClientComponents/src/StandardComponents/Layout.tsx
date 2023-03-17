type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
