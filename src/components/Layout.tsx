import { ReactNode, useState } from "react";
import SideBar from "./SideBar";
import { Menu } from "lucide-react";
interface PropsLayout {
  children: ReactNode;
}
const Layout = ({ children }: PropsLayout) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex ">
      <SideBar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
      {!isSidebarOpen && (
        <button
          className="w-8 h-8 m-3 hover:bg-gray-300 rounded-xl flex items-center justify-center duration-300"
          onClick={() => handleSidebarToggle()}>
          <Menu className="cursor-pointer  " />
        </button>
      )}
      <div className="flex-grow p-8">{children}</div>
    </div>
  );
};

export default Layout;
