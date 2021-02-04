var PORT = process.env.PORT || 8000;


// CORE MODULES


const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (template, el) => {
  let output = template.replace(/{%PROJECTNAME%}/, el.projectName);
  output = output.replace(/{%ID%}/, el.id);
  output = output.replace(/{%TECH_STACK%}/, el.stack);
  output = output.replace(/{%GITHUB%}/, el.github);
  output = output.replace(/{%DEMO%}/, el.demo);
  output = output.replace(/{%ICON%}/, el.icon);
  output = output.replace(/{%IMAGE%}/, el.image);
  output = output.replace(/{%DESCRIPTION%}/, el.description);

  if (!el.dynamic) {
    output = output.replace(/{%NOT_DYNAMIC%}/, "not-dynamic");
  }
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/index.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/card-template.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product-template.html`,
  "utf-8"
);

// READING DATABASE ==
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { Content_type: "text/html" });

    const cardsHTML = dataObj
      .map((el) => {
        return replaceTemplate(tempCard, el);
      })
      .join("");

    const output = tempOverview.replace("{%PROJECTCARDS%}", cardsHTML);

    res.end(output);
  }
  //PRODUCT
  else if (pathname === "/project") {
    res.writeHead(200, { Content_type: "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }
  //API
  else if (pathname === "/api") {
    res.writeHead(200, { Content_type: "application/json" });
    res.end(data);
  }
  //NOT FOUND
  else {
    res.writeHead(404);
    res.end(`<h1>Page not found</h1>`);
  }
});

server.listen(PORT, () => {
  console.log("Listening to requests on port ",PORT);
});
