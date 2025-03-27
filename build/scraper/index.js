"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestSellers = getBestSellers;
const puppeteer_1 = __importDefault(require("puppeteer"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const uuid_1 = require("uuid");
const dynamoCLient = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
function getBestSellers() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://www.amazon.com.br/bestsellers/";
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36");
        yield page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        yield page.waitForSelector(".p13n-sc-truncate-desktop-type2", { timeout: 5000 });
        const products = yield page.evaluate(() => {
            return Array.from(document.querySelectorAll(".p13n-sc-truncate-desktop-type2"))
                .slice(0, 3)
                .map((el) => {
                var _a;
                return ({
                    name: ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "Nome não encontrado",
                });
            });
        });
        yield browser.close();
        for (const product of products) {
            const params = {
                TableName: "BestSellersProducts",
                Item: {
                    id: { S: (0, uuid_1.v4)() },
                    name: { S: product.name },
                    timestamp: { S: new Date().toISOString() },
                },
            };
            yield dynamoCLient.send(new client_dynamodb_1.PutItemCommand(params));
        }
        console.log("Produtos salvos com sucesso no DynamoDB!");
    });
}
if (require.main === module) {
    getBestSellers()
        .then(console.log)
        .catch(console.error);
}
