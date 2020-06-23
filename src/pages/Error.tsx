import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div>
      <p> 404 Error. </p>
      <p>
        <Link to="/">Return Home</Link>
      </p>
    </div>
  )
}

export default Error
