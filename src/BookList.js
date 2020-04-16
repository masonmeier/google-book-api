import React, { Component } from 'react';

class BookList extends Component {
  constructor(props) {
    super(props);
  }

  cleanBookObject = (book) => {
    console.log(book);
    let cleanedBook = {};
    cleanedBook.title = book.volumeInfo.title;
    cleanedBook.authors = book.volumeInfo.authors ? book.volumeInfo.authors : [ "No authors listed" ];
    cleanedBook.smallImageLink = book.volumeInfo.imageLinks.smallThumbnail;
    cleanedBook.imageLink = book.volumeInfo.imageLinks.thumbnail;
    cleanedBook.description = book.volumeInfo.description ? book.volumeInfo.description : "No Description Provided";
    cleanedBook.infolink = book.volumeInfo.infoLink;
    cleanedBook.price = book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : "free";

    return cleanedBook;
  };

  render() {
    const books = this.props.books.map(book => {
      const cleanedBook = this.cleanBookObject(book);

      return (
        <div>
          <a href={cleanedBook.infolink}><h1>{cleanedBook.title}</h1></a>
          <img src={cleanedBook.smallImageLink} alt="book image" />
          <p>Author: {cleanedBook.authors[0]}</p>
          <p>Description: {cleanedBook.description}</p>
          <p>Price: { cleanedBook.price }</p>
        </div>
      );
    });

    return (
      <div>
        {books}
      </div>
    );
  }
}

export default BookList;