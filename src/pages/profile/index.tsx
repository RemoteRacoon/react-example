import React from "react";
import ProfileLayout from "./layout";
import { NextPage } from 'next';
import ProfileData from "components/pages/profile/formData";

const Profile: NextPage & { PageLayout: React.ComponentType } = () => {
  return (
    <ProfileData />
  )

}

Profile.PageLayout = ProfileLayout;
Profile.displayName = 'Page__Profile';

export default Profile;
