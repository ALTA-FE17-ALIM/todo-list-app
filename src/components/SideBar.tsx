import { ChevronsRight, ListChecks, Menu, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Link, useLocation } from "react-router-dom";

interface PropsSideBar {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: PropsSideBar) => {
  const location = useLocation();
  return (
    <>
      <div
        className={` bg-gray-100 rounded-lg shadow-sm p-3  min-h-screen  ${
          isOpen ? "-translate-x-[0%] w-[300px]" : "-translate-x-full w-0"
        } transition-all duration-300 ease-out overflow-hidden `}>
        <div>
          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-slate-700 text-xl">Menu</h3>
            <Menu onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="p-3 flex flex-col">
            <div className="flex items-center bg-white px-3 py-1 h-8 overflow-hidden rounded-xl font-medium text-sm border">
              <Search className="w-5 h-5" />
              <Input
                className="border-none focus-visible:outline-none focus-visible:ring-0"
                placeholder="Search"
              />
            </div>
            <div className="flex flex-col py-6 gap-y-2">
              <span className="uppercase text-xs font-bold text-gray-500">Tasks</span>

              <Link
                to={"/upcoming"}
                className={`flex justify-between items-center hover:bg-gray-200 py-1 px-2 duration-500 cursor-pointer rounded-sm ${
                  location.pathname === "/upcoming" && "bg-gray-200 "
                }`}>
                <div className="flex items-center gap-x-3">
                  <ChevronsRight className="h-5 w-5 text-gray-500" />
                  <span
                    className={`font-semibold text-sm  ${
                      location.pathname === "/upcoming" ? "text-black" : "text-gray-500"
                    } `}>
                    Upcoming
                  </span>
                </div>
                <span className="w-6 h-6 text-gray-800 flex items-center justify-center rounded-md text-xs font-semibold bg-white ">
                  3
                </span>
              </Link>

              <Link
                to={"/today"}
                className={`flex justify-between items-center hover:bg-gray-200 py-1 px-2 duration-500 cursor-pointer rounded-sm ${
                  location.pathname === "/today" && "bg-gray-200"
                }`}>
                <div className="flex items-center gap-x-3">
                  <ListChecks className="h-5 w-5 text-gray-500" />
                  <span
                    className={`font-semibold text-sm  ${
                      location.pathname === "/today" ? "text-black" : "text-gray-500"
                    } `}>
                    Today
                  </span>
                </div>
                <span className="w-6 h-6 text-gray-800 flex items-center justify-center rounded-md text-xs font-semibold bg-white">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
