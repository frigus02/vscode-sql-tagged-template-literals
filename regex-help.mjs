import { promises as fs } from "fs";

const prettify = (regexJson) => {
  const regex = JSON.parse(regexJson);
  if (typeof regex !== "string") {
    throw new Error("regex is not single JSON string");
  }

  let result = "";
  let escaped = false;
  let indent = 0;
  for (let i = 0; i < regex.length; i++) {
    const c = regex[i];
    if (c === "\\" && !escaped) {
      result += c;
      escaped = true;
    } else if (escaped) {
      result += c;
      escaped = false;
    } else if (c === "(") {
      indent++;
      result += c;
      result += "\n" + " ".repeat(indent * 4);
    } else if (c === ")") {
      indent--;
      result += "\n" + " ".repeat(indent * 4);
      result += c;
    } else if (c === "|") {
      result += c;
      result += "\n" + " ".repeat(indent * 4);
    } else {
      result += c;
    }
  }

  if (escaped || indent > 0) {
    throw new Error("invalid regex: still escaped or indent>0 at EOF");
  }

  return result;
};

const minify = (regex) => {
  const validateIndent = (at, indent) => {
    const spaces = indent * 4;
    for (let i = 0; i < spaces; i++) {
      at++;
      if (regex.length <= at || regex[at] !== " ") {
        throw new Error("expected space");
      }
    }

    return spaces;
  };
  const validateNewLineAndIndent = (at, indent) => {
    at++;
    if (regex.length <= at || regex[at] !== "\n") {
      throw new Error("expected newline");
    }

    return 1 + validateIndent(at, indent);
  };
  const validateIndentAndClosingBacket = (at, indent) => {
    const spaces = validateIndent(at, indent);

    at += spaces + 1;
    if (regex.length <= at || regex[at] !== ")") {
      throw new Error(
        `expected closing bracket at ${at} and found "${
          regex[at]
        }" in "${regex.substr(at - 10, 20)}"`
      );
    }

    return spaces + 1;
  };

  regex = regex.trimEnd();
  let result = "";
  let escaped = false;
  let indent = 0;
  for (let i = 0; i < regex.length; i++) {
    const c = regex[i];
    if (c === "\\" && !escaped) {
      result += c;
      escaped = true;
    } else if (escaped) {
      result += c;
      escaped = false;
    } else if (c === "(") {
      indent++;
      result += c;
      i += validateNewLineAndIndent(i, indent);
    } else if (c === "\n") {
      indent--;
      i += validateIndentAndClosingBacket(i, indent);
      result += ")";
    } else if (c === "|") {
      result += c;
      i += validateNewLineAndIndent(i, indent);
    } else {
      result += c;
    }
  }

  if (escaped || indent > 0) {
    throw new Error("invalid regex: still escaped or indent>0 at EOF");
  }

  return JSON.stringify(result);
};

const main = async () => {
  if (process.argv.length !== 4) {
    console.log(`Usage: ${process.argv[1]} <prettify|minify> <regex-file>`);
    process.exitCode = 1;
    return;
  }

  const [cmd, regexFile] = process.argv.slice(2);
  const regex = await fs.readFile(regexFile, "utf8");

  let result;
  switch (cmd) {
    case "prettify":
      result = prettify(regex);
      break;
    case "minify":
      result = minify(regex);
      break;
    default:
      throw new Error("invalid command");
  }

  console.log(result);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
