/*
 * Shakespeare Quote App
 * Front-end React Component: Post Quote
 * Form that validates data and then posts to the database
 */

import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import './PostQuote.css';

export default class PostQuote extends Component {

  constructor(props){
    super(props);
    this.state = {
      work: '',
      act: '',
      scene: '',
      quote: '',
      tags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.displaySelected = this.displaySelected.bind(this);
    this.submitQuote = this.submitQuote.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  // reset fields if sucessfully posted to the dataabse
  resetFields(){
    this.setState({
      work: '',
      act: '',
      scene: '',
      quote: '',
      tags: []
    });
    const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
    for(let field of inputFields) {
      document.getElementById(field).classList.remove('field-blank');
      document.getElementById(`help-${field}`).textContent = '';
    }
  }

  displaySelected(quote){
    this.props.displaySelectedQuote(quote);
  }

  // post data to the database
  submitQuote(event) {
    fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        work: this.state.work,
        act: this.state.act,
        scene: this.state.scene,
        quote: this.state.quote,
        tags: this.state.tags.toLowerCase().split(',')
      })
    })
      .then((res) => {
        if(res.status === 200) {
          const newTags = this.state.tags.toLowerCase().split(',');
          this.displaySelected({
            work: this.state.work,
            act: this.state.act,
            scene: this.state.scene,
            quote: this.state.quote,
            tags: newTags
          });
          this.resetFields();
        } else {
          res.json().then(body => alert(`${body.error}`));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  }

  handleFocus(key) {
    const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
    const focusedField = inputFields[inputFields.indexOf(key)]
    console.log(`Focused on: ${focusedField}`);
    const previousFields = inputFields.slice(0, inputFields.indexOf(key));
    console.log(`sliced: ${previousFields}`);
    for(let field of previousFields){
      console.log(field);
      const fieldValue = document.getElementById(field).value;
      if(fieldValue === null || fieldValue === '') {
        console.log(`${field} value: <blank>`);
        document.getElementById(field).classList.add('field-blank');
        document.getElementById(`help-${field}`).textContent = 'Required';
      } else {
        console.log(`${field} value: ${fieldValue}`);
        document.getElementById(field).classList.remove('field-blank');
        document.getElementById(`help-${field}`).textContent = '';
      }
    }
  }

  render(){
    let required = this.state.act !== '' || this.state.scene !== '';
        
    return(
      <div className='homepage' >
        <form className='' id='quote-post-container' onSubmit={this.submitQuote} onReset={this.resetFields} >
          <FormGroup controlId='formControlsText' className='form-inner'>
            <ControlLabel className='instruction'>Add a quote to the collection</ControlLabel>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-6 col-md-6'>
                <ControlLabel>Work</ControlLabel>
                <HelpBlock id='help-work'></HelpBlock>
                <FormControl className='form-control' type='text' name='work' id='work' placeholder='Henry V' onChange={this.handleChange} value={this.state.work} required  />
              </FormGroup>
              <FormGroup className='form-group col-xs-6 col-sm-3 col-md-3'>
                <ControlLabel>Act</ControlLabel>
                <HelpBlock id='help-act'></HelpBlock>
                <FormControl className='form-control' type='text' name='act' id='act' placeholder='3' onFocus={this.handleFocus.bind(this, 'act')} onChange={this.handleChange} value={this.state.act} required={required} />
              </FormGroup>
              <FormGroup className='form-group col-xs-6 col-sm-3 col-md-3'>
                <ControlLabel>Scene</ControlLabel>
                <HelpBlock id='help-scene'></HelpBlock>
                <FormControl className='form-control' type='text' name='scene' id='scene' placeholder='1' onFocus={this.handleFocus.bind(this, 'scene')}  onChange={this.handleChange} value={this.state.scene} required={required} />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-12 col-md-12'>
                <ControlLabel>Quote</ControlLabel>
                <HelpBlock id='help-quote'></HelpBlock>
                <FormControl className='form-control' type='text' id='quote' name='quote' placeholder='Once more unto the breach, dear friends, once more' onFocus={this.handleFocus.bind(this, 'quote')}  onChange={this.handleChange} value={this.state.quote} required  />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-12 col-md-12'>
                <ControlLabel>Tags</ControlLabel>
                <HelpBlock id='help-tags'></HelpBlock>
                <FormControl className='form-control' type='text' id='tags' name='tags' placeholder='courage, friends, battle, comraderie' onFocus={this.handleFocus.bind(this, 'tags')}  onChange={this.handleChange} value={this.state.tags} required  />
              </FormGroup>
            </div>
            <div className="form-row post-buttons col-xs-12 col-sm-12 col-md-12">
              <ButtonForm type='submit' label='Add Quote' className='form-button' />
              <ButtonForm type='reset' label='Reset' className='form-button reset-button' />
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }


}