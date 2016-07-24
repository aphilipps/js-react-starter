import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      content: this.props.note.content,
      isEditing: false,
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.changeEdit = this.changeEdit.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onzIndexClick = this.onzIndexClick.bind(this);
  }

  onDeleteClick(event) {
    this.props.onDeleteClick();
  }
  onTextChange(event) {
    this.setState({ content: event.target.value });
  }
  onzIndexClick(event) {
    this.props.onzIndexClick();
  }

  onDrag(e, ui) {
    this.props.onUpdateNotePosition(this.props.id, ui.x, ui.y);
    this.props.onzIndexClick();
  }
  onStartDrag() {
    this.props.onzIndexClick();
  }
  //
  // onStopDrag() {
  //   this.setState({ activeDrags: --this.state.activeDrags });
  // }

  editMode() {
    if (this.state.isEditing) {
      return <Textarea className="note-text-input" onChange={text => this.onTextChange(text)} value={this.state.content} />;
    } else {
      // return <span className="note-text" >{this.props.note.content}</span>;
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />;
    }
  }

  editSymbol() {
    if (this.state.isEditing) {
      return <i className="fa fa-check" id="click-button" onClick={this.changeEdit} aria-hidden="true"></i>;
    } else {
      // return <span className="note-text" >{this.props.note.content}</span>;
      return <i className="fa fa-pencil" id="click-button" onClick={this.changeEdit} aria-hidden="true"></i>;
    }
  }

  changeEdit(event) {
    this.setState({
      isEditing: !this.state.isEditing,
    });
    this.props.onTextChange(this.state.content);
  }

  render() {
    return (
      <Draggable
        handle=".fa-arrows-alt"
        grid={[1, 1]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note" style={{ zIndex: this.props.note.zIndex }} onClick={this.onzIndexClick}>
          <nav>
            <div>
              {this.props.note.title}
              <i className="fa fa-trash-o" id="click-button" onClick={this.onDeleteClick} aria-hidden="true"></i>
              {this.editSymbol()}
            </div>
            <i className="fa fa-arrows-alt" id="move-button" aria-hidden="true"></i>
          </nav>
          {this.editMode()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
