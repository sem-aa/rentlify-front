import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <Header />
      <div className="m-1 sm:m-4 md:m-8">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
