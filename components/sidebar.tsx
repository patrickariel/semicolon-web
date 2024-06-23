import Logo from "./logo";
import NavItem from "./nav-item";
import React from "react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={`lg:flex lg:flex-col lg:gap-[30px] ${className}`}>
      <Logo className="mb-6 lg:mb-0" />
      <NavItem href="#" icon="/images/home-hashtag.svg" text="Home" active />
      <NavItem href="#" icon="/images/search-normal.svg" text="Explore" />
      <NavItem href="#" icon="/images/notification.svg" text="Notifications" />
      <NavItem href="#" icon="/images/sms.svg" text="Messages" />
      <NavItem href="#" icon="/images/note-add.svg" text="Bookmarks" />
      <NavItem href="#" icon="/images/crown-light.svg" text="Communities" />
      <NavItem href="#" icon="/images/profile-circle.svg" text="Profile" />
      <NavItem href="#" icon="/images/group.svg" text="Sign Out" />
    </div>
  );
};

export default Sidebar;
