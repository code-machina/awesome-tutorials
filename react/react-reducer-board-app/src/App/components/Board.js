import React from 'react';
import { Table, Pagination, Icon, Segment, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import RightCMenuN from './RightCMenuN';

// Mixed Version between Presentation and Container Types

const Board = ({posts = [], board, turnPage}) => {
  // let index = 0;
  let len = isNaN(posts.length) ? 0 : posts.length;
  let unit = board.unit;
  let total = ((len < unit)) ? 1 : Math.ceil(len/ 5 );
  let cur = board.page;
  // console.log(len);
  // console.log(total);
  // console.log(posts.slice((cur-1)*unit, cur*unit));
  let table;
  let menu;
  return (
    <div>
      <h4> Posts Board </h4>
      <Segment>
        <Dimmer active={false}>
          <Loader indeterminate> Preparing Board</Loader>
        </Dimmer>
      <Table striped
        ref={ node => table=node }
        onContextMenu={(e) => {
            /* console.log('detected right click on the Table'); */
            // table.addEventListener("");
          }
        }>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Brief ... </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            posts.length > 0 ? (
              posts.slice((cur-1)*unit, cur*unit).map(post =>
                <Table.Row key={post.id} onClick={e =>  {/* console.log(e.target.id) */} }>
                  <Table.Cell id={post.id}>{post.id}</Table.Cell>
                  <Table.Cell id={post.id}>{post.author}</Table.Cell>
                  <Table.Cell id={post.id}>{post.title}</Table.Cell>
                  <Table.Cell id={post.id}>{post.content.substr(0,20)}</Table.Cell>
                </Table.Row>
              )
            ) : (
              <Table.Row>
                  <Table.Cell> No Posting </Table.Cell>
              </Table.Row>
          )
          }
        </Table.Body>
      </Table>
      <Pagination
        defaultActivePage={cur}
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={total}
        onPageChange={(e, data) => { turnPage(data.activePage); }}
      />
    </Segment>
    <RightCMenuN ref={(node) => {menu = node;}}/>
    </div>
  );
};

Board.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  ),
  turnPage : PropTypes.func.isRequired
};

export default Board;
