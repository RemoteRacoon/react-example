import { NextPage } from 'next';
import React from 'react';
import ProfileLayout from '../layout';

const ProfileDocuments: NextPage & { PageLayout: React.ComponentType } = () => {
  return (
    <div>
      Profile Documents
    </div>
  )
};

ProfileDocuments.displayName = 'ProfileDocuments-page';
ProfileDocuments.PageLayout = ProfileLayout;

export default ProfileDocuments;
