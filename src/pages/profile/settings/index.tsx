import { NextPage } from 'next';
import React from 'react';
import ProfileLayout from '../layout';

const ProfileSettings: NextPage & { PageLayout: React.ComponentType } = () => {
  return (
    <div>
      Settings page
    </div>
  )
}

ProfileSettings.PageLayout = ProfileLayout;
ProfileSettings.displayName = 'ProfileSettings-page';

export default ProfileSettings;