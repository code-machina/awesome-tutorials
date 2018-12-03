import React from 'react';
import { Link } from 'react-router-dom';
import { Grid,  Dimmer, Loader, Image, Segment  } from 'semantic-ui-react';
import AddPostForm from './AddPostForm';
import BoardContainer from './BoardContainer';
import NewBoard from './Board.React';

const Home = () => {

  return (
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Link to="/">Link Sample</Link>
            <h1>Welcome to React Practice Pack</h1>
            <pre>
I'm gonna make Simple Board App. it has a following features.
            </pre>
            <ul>
              <li>Form To Add Post</li>
              <li>List Added Posts with pagination </li>
            </ul>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2>Board Post Forms </h2>
            <AddPostForm/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2> NewBoard </h2>
              <NewBoard/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2>Board List Forms </h2>
              <BoardContainer/>
          </Grid.Column>
          <Grid.Column>
            <ul>
              <li> 2018.09.27 Add Board Feature</li>
              <li> 2018.09.27 Add Pagination Feature</li>
              <li> 2018.09.28 Listing items in descending order </li>
              <li> 2018.09.28 Add Right-Click Context Menu Features To remove and edit a post </li>
            </ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

export default Home;
