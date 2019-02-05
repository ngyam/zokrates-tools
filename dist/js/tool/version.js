"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
exports.command = 'version';
exports.desc = "Prints version number.";
exports.builder = (yargs) => {
    return yargs;
};
exports.handler = function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield versionprint(argv);
    });
};
function versionprint(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "..", "package.json"), 'utf-8'));
        console.log(pkg.version);
    });
}
//# sourceMappingURL=version.js.map