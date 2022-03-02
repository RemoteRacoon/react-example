import { NextPage } from 'next';
import React from 'react';
import ProfileLayout from '../layout';

const ProfileEmployees: NextPage & { PageLayout: React.ComponentType } = () => {
  return (
    <div>
      Employees page
    </div>
  )
}

ProfileEmployees.PageLayout = ProfileLayout;
ProfileEmployees.displayName = 'ProfileEmployees-page';

export default ProfileEmployees;