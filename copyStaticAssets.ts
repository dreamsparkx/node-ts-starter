import { cp } from "shelljs";

cp("-R", "src/public/js/lib", "dist/public/js/");
cp("-R", "src/public/fonts", "dist/public/");
cp("-R", "src/public/images", "dist/public/");
