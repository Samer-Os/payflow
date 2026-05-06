import fs from "fs";
const path = "d:/payflow/src/components/Documentation/PackageStructure.tsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  /<Icon\s+icon="tabler:folder"\s+className="([^"]+)"\s*\/>/g,
  '<Folder className="$1" width={16} height={16} aria-hidden="true" />'
);

content = content.replace(
  /<Icon\s+className="([^"]+)"\s+icon="tabler:folder"\s*\/>/g,
  '<Folder className="$1" width={16} height={16} aria-hidden="true" />'
);

fs.writeFileSync(path, content);
console.log("Done");
