import SidebarHeader from "./SidebarHeader";
import SidebarMain from "./SidebarMain";

function Sidebar () {
  return (
    <div className="bg-secondary text-primary-400 h-screen px-6 py-12">
      <SidebarHeader />
      <SidebarMain />
    </div>
  )
}

export default Sidebar;
