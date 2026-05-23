import app from "./app";
import config from "./config";
import { initDB, initIssuesDB } from "./db";


const main=()=>{
  initDB();
  initIssuesDB();
//   app.listen(config.port, () => {
//   console.log(`DevPulse app listening on port ${config.port}`)
// })

}

main();
