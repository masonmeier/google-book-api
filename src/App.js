import React, { Component } from 'react';
import SearchForm from './SearchForm';
import BookList from './BookList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [] };
  }

  updateBooks = (books) => {
    this.setState({ books })
  };

render() {
    return (
    <div>
      <h1>Google Book API</h1>
      <SearchForm updateAppBooks={this.updateBooks}/>
      <BookList books={this.state.books} />
    </div>
    );
  }
}


export default App;
