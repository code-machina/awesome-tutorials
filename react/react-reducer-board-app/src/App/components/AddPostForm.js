import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { addPost } from '../actions';
// Mixed Version between Presentation and Container Types

const AddPostForm = ({dispatch}) => {
  let author;
  let title;
  let content;

  return (
    <div>
      <h4> Write Post Contents </h4>
      <Form onSubmit={e => {
          e.preventDefault();
          if(!author.value.trim() && !title.value.trim() && !content.value.trim()){
            return;
          }
          //console.log(author.value);
          //console.log(title.value);
          //console.log(content.value);
          dispatch(addPost(author.value, title.value, content.value));
      }}>
        <Form.Field>
          <label>Author Name : </label>
          <input placeholder="Author Name" ref={node => author=node}/>
        </Form.Field>
        <Form.Field>
          <label>Title : </label>
          <input placeholder="Post Title" ref={node => title=node}/>
        </Form.Field>
        <Form.Field>
          <label>Content : </label>
          <textarea placeholder="Contents" ref={node => content=node}/>
        </Form.Field>
        <Button type="submit" content="Sumbit" />
      </Form>
    </div>
  );
};


export default connect()(AddPostForm);
