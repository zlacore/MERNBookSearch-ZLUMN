// import { useState} from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
// import type { User } from '../models/User';
import { REMOVE_BOOK } from '../utils/mutations';
import { QUERY_ME} from '../utils/queries'
import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { Book } from '../models/Book';
import { useMutation } from '@apollo/client';

const SavedBooks = () => {

  // const {username} = useParams()
  const {loading, data} = useQuery(QUERY_ME)

  // use this to determine if `useEffect()` hook needs to run again
  console.log(data)
  


  const [deleteBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }


  // Code assisted by github copilot
    try {
      await deleteBook({
        variables: { bookId }
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading || !data) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {data.username ? (
            <h1>Viewing {data.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.savedBooks.length
            ? `Viewing ${data.savedBooks.length} saved ${
                data.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
            {data.savedBooks.map((book: Book) => {
            return (
              <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image ? (
                <Card.Img
                  src={book.image}
                  alt={`The cover for ${book.title}`}
                  variant='top'
                />
                ) : null}
                <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className='small'>Authors: {book.authors.join(', ')}</p>
                <Card.Text>{book.description}</Card.Text>
                <Button
                  className='btn-block btn-danger'
                  onClick={() => handleDeleteBook(book.bookId)}
                >
                  Delete this Book!
                </Button>
                </Card.Body>
              </Card>
              </Col>
            );
            })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
