// eslint-disable-next-line @typescript-eslint/no-var-requires
const TypeDoc = require("typedoc");

async function main() {
  const app = new TypeDoc.Application();
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());
  app.bootstrap({
    entryPoints: ["src/"],
    entryPointStrategy: "Expand",
  });
  const project = app.convert();
  if (project) {
    const outDir = "docs";
    await app.generateDocs(project, outDir);
    await app.generateJson(project, `${outDir}/documentation.json`);
  }
}

main().catch(console.error);
