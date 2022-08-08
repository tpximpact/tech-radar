# TPXimpact Engineering Tech Radar

The visualisation for our TPXimpact Engineering Tech Radar. This code is using the Radar implementation open sourced by Zalando (https://github.com/zalando/tech-radar).

## Running for the first time

Create `.env` file and add the following variables:

```
NOTION_API_KEY=<The integration API key>
NOTION_DATABASE_ID=<The ID of the Tech Radar database>
NOTION_PAGE_ID=<The ID of the Tech Radar info page>
```

Run `npm install` to install the project dependencies.

Run `npx playwright install` to install the browsers required for end-to-end testing.

Run `npm run dev` and the server and Tailwind CSS build will start. The Tailwind CSS build creates the CSS file that is referenced from `public/index.html` based on what classes you're using so it's performant.

## Testing

This project uses Jest for unit testing and Playwright for end-to-end testing.

### Running unit tests

Run `npm test`.

### Running end-to-end tests

Run `npm run e2e`.
