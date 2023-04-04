### Interfaces

- [x] Option:
  - [x] some & none
  - [x] fromNullable, toNullable
- [x] Either:
  - [x] left & right
  - [ ] fromOption
  - [ ] map
  - [ ] mapLeft
  - [ ] fold
- [x] TaskEither:
  - [x] tryCatch => Wraps a promise that can be rejected into a promise that can never be rejected and that returns an Either
  - [ ] tryCatchK => Converts a function returning a Promise to one returning a TaskEither
  - [ ] map
  - [ ] chain
  - [ ] bind
  - [ ] filterOrElse
  - [ ] fromEither

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
