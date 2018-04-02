/*
 * Shakespeare Quote App
 * Front-end React Component: Post Quote
 * Form that validates data and then posts to the database
 */

import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { errorHighlighting, resetWarnings, checkInputs } from '../utils/helperFunctions';
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
      dataWorks: [
        "All's Well That Ends Well",
        "As You Like It",
        "The Comedy of Errors",
        "Cymbeline",
        "Love's Labours Lost",
        "Measure for Measure",
        "The Merry Wives of Windsor",
        "The Merchant of Venice",
        "A Midsummer Night's Dream",
        "Much Ado About Nothing",
        "Pericles, Prince of Tyre",
        "Taming of the Shrew",
        "The Tempest",
        "Troilus and Cressida",
        "Twelfth Night",
        "Two Gentlemen of Verona",
        "Winter's Tale",
        "Henry IV, part 1",
        "Henry IV, part 2",
        "Henry V",
        "Henry VI, part 1",
        "Henry VI, part 2",
        "Henry VI, part 3",
        "Henry VIII",
        "King John",
        "Richard II",
        "Richard III",
        "Antony and Cleopatra",
        "Coriolanus",
        "Hamlet",
        "Julius Caesar",
        "King Lear",
        "Macbeth",
        "Othello",
        "Romeo and Juliet",
        "Timon of Athens",
        "Titus Andronicus"
      ]
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
    resetWarnings();
    document.querySelector('.reset-button').blur();
  }

  displaySelected(quote){
    this.props.displaySelectedQuote(quote);
  }

  // post data to the database
  submitQuote(event) {
    event.preventDefault()
    const data = {
      work: this.state.work,
      act: this.state.act,
      scene: this.state.scene,
      quote: this.state.quote,
      tags: (this.state.tags.length < 1 || this.state.tags === '' || this.state.tags === null) ? [] : this.state.tags.toLowerCase().split(',').map(word => word.trim())
    };
    // only send if 'valid' input
    if(checkInputs(data, this.state.dataWorks)){
      fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((res) => {
          if(res.status === 200) {
            this.displaySelected(data);
            this.resetFields();
          } else {
            res.json().then(body => alert(`${body.error}`));
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }

  handleFocus(key) {
    const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
    const previousFields = inputFields.slice(0, inputFields.indexOf(key));
    for(let field of previousFields){
      const fieldValue = document.getElementById(field).value;
      if(fieldValue === null || fieldValue === '') {
        errorHighlighting(true, field, 'Required');
      } else {
        errorHighlighting(false, field, '');
      }
    }
  }

  render(){
        
    return(
      <div className='homepage' >
        <form className='' id='quote-post-container' onSubmit={this.submitQuote} onReset={this.resetFields} >
          <FormGroup controlId='formControlsText' className='form-inner'>
            <ControlLabel className='instruction'>Add a quote to the collection</ControlLabel>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-6 col-md-6'>
                <ControlLabel>Work</ControlLabel>
                <HelpBlock id='help-work'></HelpBlock>
                <FormControl className='form-control' type='text' name='work' id='work' list='data-works' placeholder='Henry V' onChange={this.handleChange} value={this.state.work} />
              </FormGroup>
              <FormGroup className='form-group col-xs-6 col-sm-3 col-md-3'>
                <ControlLabel>Act</ControlLabel>
                <HelpBlock id='help-act'></HelpBlock>
                <FormControl className='form-control' type='text' name='act' id='act' placeholder='3' onFocus={this.handleFocus.bind(this, 'act')} onChange={this.handleChange} value={this.state.act} />
              </FormGroup>
              <FormGroup className='form-group col-xs-6 col-sm-3 col-md-3'>
                <ControlLabel>Scene</ControlLabel>
                <HelpBlock id='help-scene'></HelpBlock>
                <FormControl className='form-control' type='text' name='scene' id='scene' placeholder='1' onFocus={this.handleFocus.bind(this, 'scene')}  onChange={this.handleChange} value={this.state.scene} />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-12 col-md-12'>
                <ControlLabel>Quote</ControlLabel>
                <HelpBlock id='help-quote'></HelpBlock>
                <FormControl className='form-control' type='text' id='quote' name='quote' placeholder='Once more unto the breach, dear friends, once more' onFocus={this.handleFocus.bind(this, 'quote')}  onChange={this.handleChange} value={this.state.quote} />
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='form-group col-xs-12 col-sm-12 col-md-12'>
                <ControlLabel>Tags (e.g. courage, family)</ControlLabel>
                <HelpBlock id='help-tags'></HelpBlock>
                <FormControl className='form-control' type='text' id='tags' name='tags' placeholder='courage, friends, battle, comraderie' onFocus={this.handleFocus.bind(this, 'tags')}  onChange={this.handleChange} value={this.state.tags}  />
              </FormGroup>
            </div>
            <div className="form-row post-buttons col-xs-12 col-sm-12 col-md-12">
              <ButtonForm type='submit' label='Add Quote' className='form-button submit-button' />
              <ButtonForm type='reset' label='Reset' className='form-button reset-button' />
            </div>
          </FormGroup>
        </form>



        <datalist id="data-works">
          {this.state.dataWorks.map((work, key) =>
            <option key={`dataWork-${key}`} value={work} />
        )}
        </datalist>
      </div>
    );
  }


}

