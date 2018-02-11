/*
 * Shakespeare Quote App
 * Front-end React form to post data
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonForm from './ButtonForm';

export default class PostQuote extends Component {

    constructor(props){
        super(props);
        this.state = {
            work: "",
            act: "",
            scene: "",
            quote: "",
            tags: []
        };

        this.submitQuote = this.submitQuote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetFields= this.resetFields.bind(this);
        }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        }
    
    resetFields(){
        this.setState({
            work: "",
            act: "",
            scene: "",
            quote: "",
            tags: ""
        });
    }

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
                tags: this.state.tags
            })
        })
        .then(() => {
            this.resetFields();
            alert('quote added');
        })
        .catch((error) => {
            console.log(error);
        });
    

    event.preventDefault();
    }

    render(){
        return(
            <div id="quote-post-container">
            <form id="post-quote" onSubmit={this.submitQuote}>
                <label>Add a quote to the collection</label>
                <input type="text" name="work" placeholder="Henry V" onChange={this.handleChange} value={this.state.work} required  />
                <input type="text" name="act" placeholder="3" onChange={this.handleChange} value={this.state.act} />
                <input type="text" name="scene" placeholder="1" onChange={this.handleChange} value={this.state.scene} />
                <input type="text" name="quote" placeholder="Once more unto the breach, dear friends, once more" onChange={this.handleChange} value={this.state.quote} required  />
                <input type="text" name="tags" placeholder="courage, friends, battle, comraderie" onChange={this.handleChange} value={this.state.tags} required  />
                <ButtonForm type="Submit" label="Add Quote" />
            </form>
        </div>
        );
    }


}