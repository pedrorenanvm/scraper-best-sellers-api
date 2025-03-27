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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamoClient = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            TableName: "BestSellersProducts",
        };
        const { Items } = yield dynamoClient.send(new client_dynamodb_1.ScanCommand(params));
        const products = Items === null || Items === void 0 ? void 0 : Items.map((item) => ({
            id: item.id.S,
            name: item.name.S,
            timestamp: item.timestamp.S,
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao buscar produtos no banco" }),
        };
    }
});
exports.getProducts = getProducts;
