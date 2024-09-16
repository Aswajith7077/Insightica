import { convertTsxToJsx } from "tsx-to-jsx";
const srcDirectory = "./src/Components/UI";
const destDirectory = "./src/Components/UI/temp";
await convertTsxToJsx(srcDirectory, destDirectory);
