import * as esbuild from 'esbuild'
import fs from "fs";


const srcDir = "./src"
const clientDistDir = "./dist/client"
const serverDistDir = "./dist/server"
const entryPoints = fs.readdirSync(srcDir);


for (const entryPoint of entryPoints) {
  if (entryPoint.endsWith(".jsx") || entryPoint.endsWith(".js") || entryPoint.endsWith('.ts') || entryPoint.endsWith('.tsx'))  {
    const isServerComponent = entryPoint.includes(".server");   // called smth like main.server.jsx
    const outDir = isServerComponent ? serverDistDir : clientDistDir;

    let ctx = await esbuild.context({
      entryPoints: [`${srcDir}/${entryPoint}`],
      outfile: `${outDir}/${entryPoint.split('.')[0]}.js`,
      bundle: true,
      format: isServerComponent ? 'cjs' : 'esm',    // file format, commonJS for server
      target: isServerComponent ? ['node14'] : ['es2015'],  // node js version
      platform: isServerComponent ? 'node' : 'browser', // platform changes some bundling options
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
      external: isServerComponent ? ['react', 'react-dom'] : [],    // removes react-dom from bundle since we have installed it on runtime already
    });
  
    await ctx.watch();
    console.log(`Watching ${entryPoint}...`);

  } else {
    console.log("Skipping " + entryPoint)
  }
}

