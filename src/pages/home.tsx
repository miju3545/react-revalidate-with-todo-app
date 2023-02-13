import React from 'react';
import withAuthorized from '../utils/withLoggedIn';

function Home() {
  return <div>Home</div>;
}

export default withAuthorized(Home);
