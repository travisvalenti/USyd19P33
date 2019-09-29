import React from 'react'

import './styles.css'

// import Button from '../../ui/Button'

type Props = {
  queryString : string
  onQueryChange : any
}

type State = {
  value : string
  query : string
}

class SearchBar extends React.Component<Props, State> {


  constructor(props : Props) {
    super(props)

    if(props.queryString === "") {
      this.state = {
        value : "",
        query : "Search mail"
      }
    }
    else {
      this.state = {
        value : "",
        query : props.queryString
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event : any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event : any) {
    event.preventDefault();
    this.props.onQueryChange(this.state.value)
  }

  render() {
    return(
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
		      <input type="text" placeholder={this.state.query} value={this.state.value} onChange={this.handleChange}/>
		      <button type="submit"><svg><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
		    </form>
      </div>
    )
  }
}

export default SearchBar