const app = require("./server");
const dotenv = require("dotenv");

async function main() {
  dotenv.config({ path: "./file.env" });
  const port = process.env.PORT || 5000;

  try {
    app.listen(port, () => {
      console.log(`listing on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
}
main().catch(console.error);
