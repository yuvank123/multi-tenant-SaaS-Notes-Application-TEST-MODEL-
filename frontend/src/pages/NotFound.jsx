import React from 'react';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
        <meta name="keywords" content="404, page not found, error" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <h1 className="text-center mt-20 text-xl text-red-500">
        404 - Page Not Found
      </h1>
    </div>
  );
}
