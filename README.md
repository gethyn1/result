# TS Result

A simple `Result` type for Typescript loosely inspired by [F# `Result`](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-fsharpresult-2.html)

## Motivation

Typescript doesn't have a standard approach to handling domain errors. Using a `Result` type helps model errors as domain concepts.

There are various implementations of this type across the internet. They are generally overly complicated or are part of a larger functional library. This library is just an implementation of the `Result` type that is easy to use in normal Typescript without requiring any other functional patterns.

## Installation

To install the package run `npm install @getjo/ts-result`

## Usage

```TypeScript
type CreateUserError = "InvalidEmail" | "UserExists"

type User = { email: string }

type UserResult = Result<User, CreateUserError>

type HttpResponse = {
  statusCode: number
  body?: string
}

const createUser = (dto: { email: string }): UserResult => {
  if (!dto.email.includes("@")) {
    return error("InvalidEmail")
  }

  return ok({ email: "example@me.com" })
}

const httpHandler = (dto: { email: string }): HttpResponse => {
  const createUserResult = createUser(dto)

  if (isOk(createUserResult)) {
    return {
      statusCode: 200,
      body: JSON.stringify(unwrapValue(createUserResult)),
    }
  }

  switch (createUserResult.error) {
    case "InvalidEmail":
      return { statusCode: 400 }
    case "UserExists":
      return { statusCode: 409 }
    default:
      return { statusCode: 500 }
  }
}
```

## Documentation

### Type annotations

#### `Result<OkType, ErrorType>`

Create a result type with an `OkType` and an `ErrorType`.

```TypeScript
type CreateUserError = "InvalidEmail" | "UserExists"

type User = { email: string }

type UserResult = Result<User, CreateUserError>
```

### Functions

#### `ok(value: OkType)`

Create a result with an `Ok` value.

```Typescript
type CreateUserError = "InvalidEmail" | "UserExists"

type User = { email: string }

type UserResult = Result<User, CreateUserError>

const userResult: UserResult = ok({ email: "example@me.com" })
```

#### `error(value: ErrorType)`

Create a result with an `Error` value.

```Typescript
type CreateUserError = "InvalidEmail" | "UserExists"

type User = { email: string }

type UserResult = Result<User, CreateUserError>

const userResult: UserResult = error("InvalidEmail")
```

#### `isOk(result: Result<OkType, ErrorType>)`

Typeguard to determine if the `Result` contains an `Ok` value.

```Typescript
const okResult = ok("This is fine")

const good = isOk(okResult) // true
```

#### `isError(result: Result<OkType, ErrorType>)`

Typeguard to determine if the `Result` contains an `Error` value.

```Typescript
const errorResult = error("Not good")

const bad = isError(errorResult) // true
```

#### `unwrapValue(result: Result<OkType, ErrorType>)`

Returns the value for a `Result` with an `Ok` value.

```Typescript
const okResult: Result<string, string> = ok("This is fine")

const okValue = unwrapValue(okResult) // "This is fine"
```

#### `unwrapError(result: Result<OkType, ErrorType>)`

Returns the value for a `Result` with an `Error` value.

```Typescript
const errorResult: Result<string, string> = error("Not good")

const errorValue = unwrapError(errorResult) // "Not good"
```