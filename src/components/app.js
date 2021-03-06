import React, { Component } from 'react';
import Immutable from 'immutable';
import InputBar from './input_bar';
import Note from './note';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map({
        1: {
          title: 'List',
          content: '- item 1 \n- item 2',
          x: 100,
          y: 100,
          zIndex: 0,
        },
        2: {
          title: 'Headings',
          content: '## big \n #### Small',
          x: 200,
          y: 200,
          zIndex: 1,
        },
        3: {
          title: 'Boring',
          content: 'Try resizing or moving notes on top of each other',
          x: 400,
          y: 150,
          zIndex: 1,
        },
      }),
      nextId: 4,
      maxZIndex: 1,
    };
  }


  onCreateNoteClick(text) {
    this.setState({
      notes: this.state.notes.set(this.state.nextId, {
        title: text,
        content: '',
        x: 0,
        y: 0,
        zIndex: this.state.maxZIndex + 1,
      }),
      maxZIndex: this.state.maxZIndex + 1,
      nextId: this.state.nextId + 1,
    });
  }

  updateNote(id, text) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { content: text }); }),
    });
  }

  updateNotePosition(id, x, y) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x, y }); }),
    });
  }

  updateZIndex(id, zIndex) {
    if (this.state.notes.get(id).zIndex < this.state.maxZIndex) {
      this.setState({
        notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { zIndex: this.state.maxZIndex + 1 }); }),
        maxZIndex: this.state.maxZIndex + 1,
      });
    }
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  renderNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note note={note} key={id} id={id}
          onDeleteClick={() => this.deleteNote(id)}
          onUpdateNotePosition={(id, x, y) => this.updateNotePosition(id, x, y)}
          onTextChange={text => this.updateNote(id, text)}
          onzIndexClick={zIndex => this.updateZIndex(id, zIndex)}
        />

      );
    });
  }

  render() {
    return (
      <div>
        <InputBar id="input-bar" key={1} onCreateNoteClick={text => this.onCreateNoteClick(text)} />
        {this.renderNotes()}
      </div>
    );
  }
}

export default App;
