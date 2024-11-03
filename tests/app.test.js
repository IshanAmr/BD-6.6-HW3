const { getAllBooks, getBookById } = require("../controller/index");
const request = require("supertest");
const http = require('http');
const { app } = require("../index");

jest.mock("../controller", () => {
    const originalModule = jest.requireActual("../controller");
    return {
        ...originalModule,
        getAllBooks: jest.fn(),
        getBookById: jest.fn(),
    };
});

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Controller Function tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all books", () => {
        const mockBooks = [
          {
            'bookId': 2,
            'title': '1984',
            'author': 'George Orwell',
            'genre': 'Dystopian'
        },
        {
            'bookId': 3,
            'title': 'The Great Gatsby',
            'author': 'F. Scott Fitzgerald',
            'genre': 'Classic'
        }
      ];

        getAllBooks.mockReturnValue(mockBooks);

        const results = getAllBooks();
        expect(results).toEqual(mockBooks);
        expect(results.length).toBe(2);
    });

    it("should return book given id", () => {
      const mockBook = 
      {
        'bookId': 1,
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee',
        'genre': 'Fiction'
     }

      getBookById.mockReturnValue(mockBook);

      const results = getBookById(1);
      expect(results).toEqual(mockBook);
  });
});

describe("API Endpoint tests", () => {
    it("GET /books should get all books", async () => {
        const mockBooks = [
          {
            'bookId': 2,
            'title': '1984',
            'author': 'George Orwell',
            'genre': 'Dystopian'
        },
        {
            'bookId': 3,
            'title': 'The Great Gatsby',
            'author': 'F. Scott Fitzgerald',
            'genre': 'Classic'
        }
      ];

        getAllBooks.mockReturnValue(mockBooks);

        const res = await request(server).get("/books");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ books: mockBooks });
    });

    it("GET /books/details/:id should get a book by ID", async () => {
      const mockBook = 
      {
        'bookId': 1,
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee',
        'genre': 'Fiction'
     };

        getBookById.mockReturnValue(mockBook);

        const res = await request(server).get("/books/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ book: mockBook });
    });
});
