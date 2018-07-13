/*
 * Shakespeare Quote App
 * Front-end React Component: Post Quote
 * Form that validates data and then posts to the database
 */

import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { inputHasErrors, resetWarnings, checkIfPreviousFieldBlank } from '../utils/errorHandling';
import { shakespeareWorks } from '../utils/constants';
import { postQuote } from '../utils/apiCalls';
import './PostQuote.css';

export default class PostQuote extends Component {
  constructor(props){
    super(props);
    this.state = {
      work: '',
      act: '',
      scene: '',
      quote: '',
      tags: [],
      titleOfWorks: shakespeareWorks
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.displaySelected = this.displaySelected.bind(this);
  }

  resetFields() {
    this.setState({
      work: '',
      act: '',
      scene: '',
      quote: '',
      tags: []
    });
    resetWarnings('post');
  }

  displaySelected(quote) {
    this.props.displaySelectedQuote([quote]);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleFocus(key) {
    const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
    const previousFields = inputFields.slice(0, inputFields.indexOf(key));
    for(let field of previousFields){
      checkIfPreviousFieldBlank(field, 'post');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    document.querySelector('#quote-display-container').style.display = 'block';
    const data = {
      work: this.state.work,
      act: this.state.act,
      scene: this.state.scene,
      quote: this.state.quote,
      tags: (this.state.tags.length < 1 || this.state.tags === '' || this.state.tags === null || this.state.tags === undefined) ? [] : this.state.tags.toLowerCase().split(',').map(word => word.trim())
    };
    if(!inputHasErrors(data, this.state.titleOfWorks, 'post')){
      postQuote(data, this.resetFields, this.displaySelected);
    }
  }

  render(){
    return(
      <div className='homepage' >
        <form className='' id='quote-post-container' onSubmit={this.handleSubmit} onReset={this.resetFields} >
          <FormGroup controlId='formControlsText' className='form-inner'>
            <ControlLabel className='instruction'>Add a quote to the collection</ControlLabel>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-6 col-md-6'>
                <ControlLabel>Work</ControlLabel>
                <HelpBlock id='help-work-post'></HelpBlock>
                <FormControl className='form-control' type='text' name='work' id='work-post' list='data-works' placeholder='Henry V' onChange={this.handleChange} value={this.state.work} />
              </FormGroup>
              <FormGroup className='form-group col-xs-6 col-sm-3 col-md-3'>
                <ControlLabel>Act</ControlLabel>
                <HelpBlock id='help-act-post'></HelpBlock>
                <FormControl className='form-control' type='number' name='act' id='act-post' placeholder='3' onFocus={this.handleFocus.bind(this, 'act')} onChange={this.handleChange} value={this.state.act} />
              </FormGroup>
              <FormGroup className='form-group col-xs-6 col-sm-3 col-md-3'>
                <ControlLabel>Scene</ControlLabel>
                <HelpBlock id='help-scene-post'></HelpBlock>
                <FormControl className='form-control' type='number' name='scene' id='scene-post' placeholder='1' onFocus={this.handleFocus.bind(this, 'scene')}  onChange={this.handleChange} value={this.state.scene} />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-12 col-md-12'>
                <ControlLabel>Quote</ControlLabel>
                <HelpBlock id='help-quote-post'></HelpBlock>
                <FormControl className='form-control' type='text' name='quote' id='quote-post' placeholder='Once more unto the breach, dear friends, once more' onFocus={this.handleFocus.bind(this, 'quote')}  onChange={this.handleChange} value={this.state.quote} />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-12 col-md-12'>
                <ControlLabel>Tags (e.g. courage, family)</ControlLabel>
                <HelpBlock id='help-tags-post'></HelpBlock>
                <FormControl className='form-control' type='text' name='tags' id='tags-post' placeholder='courage, friends, battle, comraderie' onFocus={this.handleFocus.bind(this, 'tags')}  onChange={this.handleChange} value={this.state.tags}  />
              </FormGroup>
            </div>
            <div className="form-row post-buttons col-xs-12 col-sm-12 col-md-12">
              <ButtonForm type='submit' label='Add Quote' className='form-button submit-button' />
              <ButtonForm type='reset' label='Reset' className='form-button reset-button' />
            </div>
          </FormGroup>
        </form>

        <datalist id="data-works">
          {this.state.titleOfWorks.map((work, key) =>
            <option key={`dataWork-${key}`} value={work} />
          )}
        </datalist>
      </div>
    );
  }
}

PostQuote.propTypes = {
  displaySelectedQuote: PropTypes.func
};
