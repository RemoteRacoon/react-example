import ProfileHeader from "components/pages/profile/_partials/Header";
import { FC } from "react";

const ProfileLayout: FC = ({ children }) => {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  )
}

ProfileLayout.displayName = 'ProfileLayout';

export default ProfileLayout;