/*
 * Shakespeare Quote App
 * Front-end React Component: Update Quote
 * Update a quote in the database
 */

import React, {Component} from 'react';
import ButtonForm from '../item-components/ButtonForm';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import {inputHasErrors, checkIfPreviousFieldBlank} from '../utils/errorHandling';
import {shakespeareWorks} from '../utils/constants';
import {updateQuote} from '../utils/apiCalls';
import './UpdateQuote.css';
import {openElement, toggleSections} from '../utils/updateDisplay';

export default class UpdateQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      work: '',
      act: '',
      scene: '',
      quote: '',
      tags: '',
      titleOfWorks: shakespeareWorks
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.displaySelected = this.displaySelected.bind(this);
  }

  USAFE_componentWillReceiveProps(newProps) {
    if (newProps.quotes.length > 0) {
      this.setState({
        id: newProps.quotes[0]._id === undefined ? newProps.quotes[0].objId : newProps.quotes[0]._id,
        work: newProps.quotes[0].work,
        act: newProps.quotes[0].act,
        scene: newProps.quotes[0].scene,
        quote: newProps.quotes[0].quote,
        tags: newProps.quotes[0].tags.join(', ')
      });
    }
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
    for (let field of previousFields) {
      checkIfPreviousFieldBlank(field, 'update');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.state.id,
      work: this.state.work,
      act: this.state.act,
      scene: this.state.scene,
      quote: this.state.quote,
      tags:
        this.state.tags.length < 1 ||
        this.state.tags === '' ||
        this.state.tags === null ||
        this.state.tags === undefined
          ? []
          : this.state.tags
            .toLowerCase()
            .split(',')
            .map(word => word.trim())
    };
    if (!inputHasErrors(data, this.state.titleOfWorks, 'update')) {
      document.querySelector('.submit-button').blur();
      updateQuote(data, this.displaySelected);
      openElement('quote-display-container');
    }
  }

  handleCancel(event) {
    event.preventDefault();
    toggleSections('quote-display-container', 'quote-update-container');
    this.displaySelected({
      id: this.state.id,
      work: this.state.work,
      act: this.state.act,
      scene: this.state.scene,
      quote: this.state.quote,
      tags:
        this.state.tags.length < 1 ||
        this.state.tags === '' ||
        this.state.tags === null ||
        this.state.tags === undefined
          ? []
          : this.state.tags
            .toLowerCase()
            .split(',')
            .map(word => word.trim())
    });
    document.querySelector('.quote-box').style.display = 'block';
  }

  render() {
    return (
      <div className="homepage">
        <form className="" id="quote-update-container" onSubmit={this.handleSubmit} onReset={this.resetFields}>
          <FormGroup controlId="formControlsText" className="form-inner">
            <ControlLabel className="instruction">Update a quote in the collection</ControlLabel>
            <div className="form-row">
              <FormGroup className="form-group col-xs-12 col-sm-6 col-md-6">
                <ControlLabel>Work</ControlLabel>
                <HelpBlock id="help-work-update" />
                <FormControl
                  className="form-control"
                  type="text"
                  name="work"
                  id="work-update"
                  list="data-works-update"
                  placeholder="Henry V"
                  onChange={this.handleChange}
                  value={this.state.work}
                />
              </FormGroup>
              <FormGroup className="form-group col-xs-6 col-sm-3 col-md-3">
                <ControlLabel>Act</ControlLabel>
                <HelpBlock id="help-act-update" />
                <FormControl
                  className="form-control"
                  type="text"
                  name="act"
                  id="act-update"
                  placeholder="3"
                  onFocus={this.handleFocus.bind(this, 'act')}
                  onChange={this.handleChange}
                  value={this.state.act}
                />
              </FormGroup>
              <FormGroup className="form-group col-xs-6 col-sm-3 col-md-3">
                <ControlLabel>Scene</ControlLabel>
                <HelpBlock id="help-scene-update" />
                <FormControl
                  className="form-control"
                  type="text"
                  name="scene"
                  id="scene-update"
                  placeholder="1"
                  onFocus={this.handleFocus.bind(this, 'scene')}
                  onChange={this.handleChange}
                  value={this.state.scene}
                />
              </FormGroup>
            </div>
            <div className="form-row">
              <FormGroup className="form-group col-xs-12 col-sm-12 col-md-12">
                <ControlLabel>Quote</ControlLabel>
                <HelpBlock id="help-quote-update" />
                <FormControl
                  className="form-control"
                  type="text"
                  name="quote"
                  id="quote-update"
                  placeholder="Once more unto the breach, dear friends, once more"
                  onFocus={this.handleFocus.bind(this, 'quote')}
                  onChange={this.handleChange}
                  value={this.state.quote}
                />
              </FormGroup>
            </div>
            <div className="form-row">
              <FormGroup className="form-group col-xs-12 col-sm-12 col-md-12">
                <ControlLabel>Tags (e.g. courage, family)</ControlLabel>
                <HelpBlock id="help-tags-update" />
                <FormControl
                  className="form-control"
                  type="text"
                  name="tags"
                  id="tags-update"
                  placeholder="courage, friends, battle, comraderie"
                  onFocus={this.handleFocus.bind(this, 'tags')}
                  onChange={this.handleChange}
                  value={this.state.tags}
                />
              </FormGroup>
            </div>
            <div className="form-row post-buttons col-xs-12 col-sm-12 col-md-12">
              <ButtonForm type="submit" label="Update Quote" className="form-button submit-button" />
              <ButtonForm
                type="button"
                click={this.handleCancel}
                label="Cancel"
                className="form-button cancel-button"
              />
            </div>
          </FormGroup>
        </form>

        <datalist id="data-works-update">
          {this.state.titleOfWorks.map((work, key) => (
            <option key={`dataWork-${key}`} value={work} />
          ))}
        </datalist>
      </div>
    );
  }
}

UpdateQuote.propTypes = {
  displaySelectedQuote: PropTypes.func,
  work: PropTypes.string,
  act: PropTypes.string,
  scene: PropTypes.string,
  quote: PropTypes.string,
  tags: PropTypes.array
};
