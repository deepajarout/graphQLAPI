
# Basic GraphQL API Approach

## Instruction

### How Run the project

1- Download the project.

2- ``` npm install ```.

3-check in Browser type http://localhost:5000.

you will get the graphql screen 

## Query - access  the data using  query

```  
//get books list with authorname
      query {
         books {
                  title,                     
                  author,
                  authorName,
                }
  ```
 ```  
 //get author list with books
 query{
        authors {
          title,
          books
               }
          }
          
 ```
 
```  
//get books by id
query{
        books(id:1){
        title,
        authorName{
        title
        }
        }
        
 ```
 
        
   ``` 
   //get author by id
   query{
        authors(id:1){
        title,
        books{
        title
        }
        }
        
```

## Mutation - add new data 

```
mutation {
 addBook(title:"Harry Potter series 3", author:1){
    title,
    author,
    authorName
    }
    
```

