/*
 * Shakespeare Quote App
 * Front-end React Component: Post Quote
 * Form that validates data and then posts to the database
 */

import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import { FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
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

    this.submitQuote = this.submitQuote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.displaySelected = this.displaySelected.bind(this);
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
      tags: ''
    });
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

  render(){
    let required = this.state.act !== '' || this.state.scene !== '';
        
    return(
      <div className='homepage' >
        <form className='' id='quote-post-container' onSubmit={this.submitQuote}>
          <FormGroup controlId='formControlsText' className='form-inner'>
            <ControlLabel className='instruction'>Add a quote to the collection</ControlLabel>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-6'>
                <ControlLabel>Work</ControlLabel>
                <FormControl className='form-control' type='text' name='work' id='work' placeholder='Henry V' onChange={this.handleChange} value={this.state.work} required  />
              </FormGroup>
              <FormGroup className='form-group col-xs-3'>
                <ControlLabel>Act</ControlLabel>
                <FormControl className='form-control' type='text' name='act' placeholder='3' onChange={this.handleChange} value={this.state.act} required={required} />
              </FormGroup>
              <FormGroup className='form-group col-xs-3'>
                <ControlLabel>Scene</ControlLabel>
                <FormControl className='form-control' type='text' name='scene' placeholder='1' onChange={this.handleChange} value={this.state.scene} required={required} />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-md-12'>
                <ControlLabel>Quote</ControlLabel>
                <FormControl className='form-control' type='text' id='quote' name='quote' placeholder='Once more unto the breach, dear friends, once more' onChange={this.handleChange} value={this.state.quote} required  />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-md-12'>
                <ControlLabel>Tags</ControlLabel>
                <FormControl className='form-control' type='text' id='tags' name='tags' placeholder='courage, friends, battle, comraderie' onChange={this.handleChange} value={this.state.tags} required  />
              </FormGroup>
            </div>
            <ButtonForm type='submit' label='Add Quote' className='form-button' />
          </FormGroup>
        </form>
      </div>
    );
  }


}