import React from 'react';
import { Query } from 'react-apollo';
import { Image } from 'semantic-ui-react';
import * as images from '../../../../images';
import { GET_USER_LOCAL } from '../../../../graphql/local/queries';

const Logo = ({ size, avatar }) => (
  <Query query={GET_USER_LOCAL}>
    {({
      loading,
      data: {
        user: { companyName },
      },
    }) => {
      if (loading) {
        return (
          <div>
            <p>...loading</p>
          </div>
        );
      }
      if (!companyName) {
        return null;
      }

      const name = companyName
        .trim()
        .split(' ')
        .join('')
        .toLowerCase();

      if (name in images) {
        const logo = images[name].logo;
        if (!logo) {
          return images.ripple.logo;
        }
        if (avatar) {
          return <Image src={logo} avatar />;
        }
        return <Image size={size} centered src={logo} />;
      }
      return null;
    }}
  </Query>
);

export default Logo;
