import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';

const AvatarNavigation = () => (
  <Link to="/home">
    <Avatar
      name="AHAM: MT-Space"
      size="sm"
      src="/avatar-small.jpg"
      cursor="pointer"
    />
  </Link>
);

export default AvatarNavigation;
