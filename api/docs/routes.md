## Routes
| Route                    | HTTP Verb | Description                                               | Requires Auth |
|:-------------------------|:----------|:----------------------------------------------------------|:--------------|
| /user/:username          | GET       | Returns the user with a specific username                 | Yes           |
| /users/:query            | GET       | Searches for users whose names match a given query string | Yes           |
| /user/:username/icon     | GET       | Returns profile icon user with a specific username        | Yes           |
| /user/:username/pic      | GET       | Returns profile picture user with a specific username     | Yes           |
| /user/:username/big_pic  | GET       | Returns big profile picture user with a specific username | Yes           |
| /user                    | POST      | Creates a user                                            | No            |
| /user                    | PATCH     | Update the data of a user                                 | Yes           |
| /user                    | DELETE    | Deletes a user                                            | Yes           |
|                          |           |                                                           |               |
| /login                   | POST      | Authenticates a user, returns a JWT                       | No            |
| /logout                  | DELETE    | Deletes the user's current active session                 | Yes           |
|                          |           |                                                           |               |
| /block                   | GET       | Returns a list of blocked users                           | Yes           |
| /block                   | POST      | Blocks a user                                             | Yes           |
| /block                   | DELETE    | Unblocks a user                                           | Yes           |
|                          |           |                                                           |               |
| /follow                  | GET       | Returns a list of users followed by a user                | Yes           |
| /followers               | GET       | Returns a list of users following a user                  | Yes           |
| /follow                  | POST      | Follows a user                                            | Yes           |
| /follow                  | DELETE    | Unfollows a user                                          | Yes           |
