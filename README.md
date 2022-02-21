# TPXimpact Engineering Tech Radar

The visualisation for our TPXimpact Engineering Tech Radar. This code is using the Radar implementation open sourced by Zalando (https://github.com/zalando/tech-radar).

## Running for the first time
Create `.env` file and add the following variables:
```
NOTION_API_KEY=<The integration API key>
NOTION_DATABASE_ID=<The ID of the Tech Radar database>
```

Run `npm install`

Run `npm run dev` and the server and Tailwind CSS build will start. The Tailwind CSS build creates the CSS file that is referenced from `public/index.html` based on what classes you're using so it's performant. 