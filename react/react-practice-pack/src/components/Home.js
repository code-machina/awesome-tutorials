import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

const Home = () => {
  return (
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Link to="/">Link Sample</Link>
            <h1>Welcome to React Practice Pack</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

export default Home;
