### Interfaces

- Option:
  - some & none
  - fromNullable, toNullable
  
- Either:
  - map
  - mapLeft
  - fold 
  - fromOption
  
- TaskEither:
  - tryCatch
  - map
  - chain
  - bind
  - filterOrElse
  - fromEither
  
### Functions

- pipe
- flow => Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

## Blaze through fp-ts

- Option
  - some & none
  	- Example: function to find a person by name
  - fromNullable, toNullable
  	- Request (nullable) => Backend (Option) => Database (nullable)
  	- Example: https://github.com/unvoidweb/rookye/blob/dev/apps/api/src/app/operations/domains/create-one-domain.ts
  	  - In Rookye, we receive the request with nullable fields, transform to Option on the backend, then when 
  	  sending to DB, we transform back to nullable

- Either

- Task

- TaskEither

- Pipe

- Flow

