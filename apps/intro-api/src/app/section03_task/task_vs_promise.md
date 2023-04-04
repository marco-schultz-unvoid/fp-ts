https://dev.to/mkessy/functional-programming-baby-steps-why-taskeither-is-better-than-promise-35j0

- A Task is a Promise that never rejects, so we can handle the error logic with Either, using
  an interface called TaskEither.
- A Task is a lazy Promise, it needs to be called to execute, similar to how rxjs observables need to be subscribed
