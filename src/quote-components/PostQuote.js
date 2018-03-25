/*
 * Shakespeare Quote App
 * Front-end React Component: Post Quote
 * Form that validates data and then posts to the database
 */

import React, { Component } from 'react';
import ButtonForm from '../button-components/ButtonForm';
require('./Forms.css');

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
    this.showSection = this.showSection.bind(this);
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
          this.resetFields();
          alert('quote added');
        } else {
          res.json().then(body => alert(`${body.error}`));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  }

  showSection() {
    document.getElementById('post-quote').classList.toggle('open');
  }
    
  render(){
    let required = this.state.act !== '' || this.state.scene !== '';
        
    return(
      <div className='homepage' id='quote-post-container'>
        <h2 onClick={this.showSection}>Add a Quote</h2>
        <form className='' id='post-quote' onSubmit={this.submitQuote}>
          <label className='instruction'>Add a quote to the collection</label>
          <div className='form-row'>
            <div className='form-group col-xs-6'>
              <label htmlFor='work'>Work</label>
              <input className='form-control' type='text' name='work' id='work' placeholder='Henry V' onChange={this.handleChange} value={this.state.work} required  />
            </div>
            <div className='form-group col-xs-3'>
              <label htmlFor='act'>Act</label>
              <input className='form-control' type='text' name='act' placeholder='3' onChange={this.handleChange} value={this.state.act} required={required} />
            </div>
            <div className='form-group col-xs-3'>
              <label htmlFor='scene'>Scene</label>
              <input className='form-control' type='text' name='scene' placeholder='1' onChange={this.handleChange} value={this.state.scene} required={required} />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='quote'>Quote</label>
              <input className='form-control' type='text' id='quote' name='quote' placeholder='Once more unto the breach, dear friends, once more' onChange={this.handleChange} value={this.state.quote} required  />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='tags'>Tags</label>
              <input className='form-control' type='text' id='tags' name='tags' placeholder='courage, friends, battle, comraderie' onChange={this.handleChange} value={this.state.tags} required  />
            </div>
          </div>
          <ButtonForm type='Submit' label='Add Quote' />
        </form>
      </div>
    );
  }


}