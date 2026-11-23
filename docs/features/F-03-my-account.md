# F-03: My Account through an API token
Status: Draft

## Summary (2 to 3 sentences)
A user who logs in through the API can open My Account by setting the returned token as a browser cookie, without the UI login.

## User story
As a registered user, I want my session to carry over, so that I can see my account without logging in again.

## Preconditions
- The store binary is running.
- Admin credentials (from `Data/UserDetailAPI.js` or `ADMIN_PASSWORD` in `.env`).

## Functional requirements (FR-NN)
- FR-01: `POST /api/login` with a username and password returns a token.
- FR-02: A `token` cookie authenticates the browser.
- FR-03: The My Account page shows its heading when authenticated.

## Acceptance criteria (AC-NN, each one testable)
- AC-01: After injecting a token from `POST /api/login` as the `token` cookie, the My Account page heading is visible.
- AC-02: Without a valid token, My Account doesn't show account details [INFERRED].

## Out of scope
- UI login.

## Open questions
- Open question: What does My Account show without a token: a redirect or an error? [INFERRED]

## Source files this feature touches
- tests/myAccount.spec.js
- features/my-account.feature
- API-Calls/getLoginToken.js
- Data/UserDetailAPI.js
- pageObject/MyAccountPage.js
