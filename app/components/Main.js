import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const ReactCSSTG = CSSTransitionGroup;

// Main app
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: true
      }
      // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isVisible: false
    }, function() {
      console.log(this.state.isVisible)
    });
    return false;
  }
  handleRemount(e) {
    this.setState({
      isVisible: true
    }, function() {
      console.log(this.state.isVisible)
    });
    e.preventDefault();
  }
  render() {

    // const for React CSS transition declaration
    let component = this.state.isVisible ? <Modal onSubmit={ this.handleSubmit } key='modal'/> : <ModalBack onClick={ this.handleRemount } key='bringitback'/>;

    return <ReactCSSTG transitionName="animation" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
             { component }
           </ReactCSSTG>
  }
}

// Modal
class Modal extends React.Component {
  render() {
    return <div className='Modal'>
              <Logo />
              <form onSubmit= { this.props.onSubmit }>
                <Input type='text' name='username' placeholder='username' />

                <button> <i className="fa fa-github"aria-hidden="true"></i>  Sign In</button>
              </form>
                <a href='#'>Sign in using your Github account!</a>
           </div>
  }
}

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }

}

// Fake logo
class Logo extends React.Component {
  render() {
    return <div className="logo">
                <i aria-hidden="true"></i>
                <span> Github Notes </span>
              </div>
  }
}

// Button to brind the modal back
class ModalBack extends React.Component {
  render() {
    return <button className="bringitback" onClick={ this.props.onClick } key={ this.props.className }>Bring the modal back !</button>
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
