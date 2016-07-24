import React, { Component } from 'react';


class InputBar extends Component {
  constructor(props) {
    super(props);

    this.state = { noteTitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // add this above your render method
  onInputChange(event) {
    this.setState({ noteTitle: event.target.value });
  }
  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onCreateNoteClick(this.state.noteTitle);
    this.setState({ noteTitle: '' });
  }

  render() {
    return (


      <div id="input-bar">
        <form>
          <input type="text" name="Title" placeholder="New Note Title" onChange={this.onInputChange} />
          <button type="submit" onClick={this.onClick}>Click Me!</button> ..
        </form>
      </div>
    );
  }
}

export default InputBar;
