# Documind

Documind is an intelligent document chat application that allows users to interact with PDF documents using natural language queries. By leveraging advanced AI technologies, Documind converts PDFs into searchable vector embeddings, enabling users to ask questions and receive accurate responses based on the document's content.

## Features

- PDF document upload and processing
- Conversion of PDF content into vector embeddings
- Natural language querying of document content
- AI-powered responses based on document context

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [PostgreSQL](https://www.postgresql.org/) - Open-source relational database
- [Pinecone](https://www.pinecone.io/) - Vector database for efficient similarity search
- [OpenAI API](https://openai.com/api/) - AI language model for natural language processing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Pinecone account
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/documind.git
   cd documind
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   
   DATABASE_URL=your_postgresql_connection_string
   
   NEXT_PUBLIC_S3_ACCESS_KEY_ID=your_s3_access_key_id
   NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=your_s3_secret_access_key
   NEXT_PUBLIC_S3_BUCKET_NAME=your_s3_bucket_name
   
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run database migrations:
   ```
   npx drizzle-kit push
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Upload a PDF document using the provided interface.
2. Wait for the document to be processed and converted into vector embeddings.
3. Once processing is complete, start asking questions about the document in natural language.
4. Receive AI-generated responses based on the content of your PDF.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
