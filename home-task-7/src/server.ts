import app, {assertDatabaseConnectionOk} from "./app";
import logger from "./logger";



async function init(){
    await assertDatabaseConnectionOk();
    const port = 8080; //process.env.PORT;

    app.listen(port, () => {
      logger.info(`⚡️[server]: Server is now running at http://localhost:${port}`);
    });
}

init();