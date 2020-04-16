import React, { Component } from 'react';

const bookTypeOptions = [
  {
    bookType: "full",
    label: "Full"
  },
  {
    bookType: "partial",
    label: "Partial"
  },
  {
    bookType: "free-ebooks",
    label: "Free Ebooks"
  },
  {
    bookType: "paid-ebooks",
    label: "Paid Ebooks"
  },
  {
    bookType: "ebooks",
    label: "Ebooks"
  },

];

const printTypeOptions = [
  {
    printType: "all",
    label: "All"
  },
  {
    printType: "books",
    label: "Books"
  },
  {
    printType: "magazines",
    label: "Magazines"
  },
];

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookType: 'full',
      printType: 'all',
      searchTerm: ''
    }
  };


  handleBookTypeChange =(event) => {
    this.setState({bookType: event.target.value})
  };

  handlePrintTypeChange =(event) => {
    this.setState({printType: event.target.value})
  };
  
    handleSearchSubmit =(event) => {
      event.preventDefault();
      //const key = 'AIzaSyBAaf_92tsamNL3Z2WN6AxQiDhkUB6uvGE';
      //key is no longer needed for this API
      let url = 'https://www.googleapis.com/books/v1/volumes';
      const { bookType, printType, searchTerm } = this.state;
      const urlString = url + `?q=${searchTerm}&filter=${bookType}&printType=${printType}`;

      if (searchTerm === '') {
        alert('you must enter a search term');
        return;
      }

      fetch(urlString)
        .then(function(res) {
            if (!res.ok) {
              throw Error('bad response from server');
            }
            return res.json();
          }
        )
        .then(
          (result) => {
            this.props.updateAppBooks(result.items);
          }
        )
        .catch(function(error) {
          console.log(error);
          alert('Bad response from server')
        });
    };

  handleSearchTermChange =(event) => {
    this.setState({searchTerm: event.target.value})
  };

  render() {

    return (
      <div>
        <form>

        <label for="bookSearch">Search</label>
          <input id="bookSearch" onChange={this.handleSearchTermChange}/>

          <label for="bookType">Book Type</label>
          <select value={this.state.bookType} id="bookType" onChange={this.handleBookTypeChange}>
            {bookTypeOptions.map((bookOption) =>
              <option value={bookOption.bookType}>{bookOption.label}</option>
            )}
          </select>

          <label for="printType">Print Type</label>

          <select value={this.state.printType} id="printType" onChange={this.handlePrintTypeChange}>
            {printTypeOptions.map((printOption) =>
              <option value={printOption.printType}>{printOption.label}</option>
            )}
          </select>


          <button onClick={this.handleSearchSubmit} id="search">SEARCH</button>

        </form>
      </div>
    )
  }
}



export default SearchForm