[![gok99](https://circleci.com/gh/gok99/moot-frontend.svg?style=svg)](<LINK>)

<p align="center">
  <img src="https://lh3.googleusercontent.com/keep-bbsk/AGk0z-MsssfEwTPHJ-o1m-EWVFqpM-QGrWSZh2cMyVvtG-XIG7TYjoIxr1AIU1GmSYZBDoOfdhjsDpz2SPbvG5n1qsJSsC4x1xqPYumStjs=s445" />
</p>

# Moot Frontend

Moot frontend is a cog in the moot architecture that provides a gateway for users into 1-on-1 conversations. Moot frontend allows users to create and interact with posts, and monitor the status of their moot chats.

## The moot story

Having matriculated during a pandemic, and with social interaction becoming increasingly scarce, our current batch faces a crucial challenge: meeting and connecting with fellow batchmates.

A core aspect of a university education is the opportunity to meet diverse individuals from multicultural backgrounds who offer new ideas and perspectives. However, with most students inundated with assignments and deadlines, it can be difficult to find the time to approach and talk to other students without fear of taking up too much of other peoples’ time. This often leads to a vicious cycle, where unless forced, no one finds the incentive to approach and talk to their peers. This effect, unfortunately, has only been compounded by the pandemic.

For most of us, almost an entire academic year has been spent not in the physical campus along with our fellow classmates, but within our own homes in solitude. We want to address the question of how we can emulate or even improve the intimacy and effectiveness of a real-life interaction but in a distributed, online setting.

Moot aims to expedite the process of social interaction and forming new connections, in an increasingly isolated world. We want to do this by matching individuals on the basis of common interest in deeper ideas/questions/themes as opposed to generic topic tags. To prevent distractions from the need to engage in small talk and make good first impressions, moot conversations are anonymous by default until users are comfortable enough to reveal their identities..

## Set up

1. Install a stable version of NodeJS. The active LTS or current version should work fine.
2. Clone this repository and navigate to it using "cd" in your command line or shell tool.
3. Run `yarn install` to install dependencies.
4. Run `yarn start` to start the server at `localhost:3000`.
5. Point your browser to `http://localhost:3000` to see your local Moot.

## Environment Set-up

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```
The environment variables are firebase related and can be found in the firebase project settings

## Testing

To run the tests after you made your modifications, run
`yarn test`. If you are convinced that the failing tests are not your fault, you can update the regression tests by running:
``` {.}
$ yarn test --updateSnapshot
```
and then typing `a` to update all snapshots.
