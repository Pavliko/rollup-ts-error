import path from "path";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@wessberg/rollup-plugin-ts";

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "src/index.tsx");
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, "dist");

const LOCAL_EXTERNALS = ["react", "react-dom"];

export default [
  {
    input: INPUT_FILE,
    output: [
      {
        dir: "dist",
        format: "cjs",
        exports: "auto",
        plugins: [terser()],
      },
      {
        dir: "dist/esm",
        format: "esm",
        exports: "auto",
      },
    ],
    external: LOCAL_EXTERNALS,
    plugins: [
      clear({
        targets: [OUTPUT_DIR],
      }),
      typescript({
        transpiler: "babel",
        tsconfig: "./tsconfig.json",
      }),
      babel({
        // eslint-disable-next-line no-undef
        ...require("./babel.config"),
        extensions: [".ts", ".tsx"],
        babelHelpers: "bundled",
      }),
      nodeResolve(),
      commonjs(),
    ],
  },
];
