
# Basic GraphQL API Approach

## Instruction

### How Run the project

1- download the project.

2- ``` npm install ```.

3-check in Browser type http://localhost:5000.

you will get the graphql screen 

## Query - access  the data using  query

```  
     #### query {
            books {
                  title,
                  author,
                  authorName
                  } 
  ```

## Mutation - add new data 

```
mutation {
 addBook(title:Harry Potter series 3, author:1){
    title,
    author,
    authorName
    }
    ```

