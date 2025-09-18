Implementation plan
* Stage 1: Indexting 
* 1. Load the document - pdf, text 
* 2. Chunk the document 
* 3. Generate vector embeddings 
* 4. Store the vector embeddings -Vector database


*  Stage 2:
 Using the chatbot 
 * 1. Setup LLM 
 * 2. Add retrieval step 
 * 3. Pass input + relavant information to LLM
 * 4. Congratulation

<!-- documentation  -->
https://js.langchain.com/docs/integrations/document_loaders/file_loaders/pdf/
vector database
https://js.langchain.com/docs/integrations/vectorstores/
for openAi
setup: https://js.langchain.com/docs/integrations/vectorstores/

<!-- Toos usser for creating chatbot Details -->

vector databse use pinecone

Langchain for pdf parser
## Installation of thrid parties
1. npm i @langchain/community
2. npm i @langchain/core pdf-parse
