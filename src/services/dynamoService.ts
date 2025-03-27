import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

const TABLE_NAME = "BestSellersProducts";

export async function saveProduct(name: string) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: { S: uuidv4() },
      name: { S: name },
      timestamp: { S: new Date().toISOString() },
    },
  };

  await dynamoClient.send(new PutItemCommand(params));
}

export async function getProducts() {
  const params = { TableName: TABLE_NAME };
  const { Items } = await dynamoClient.send(new ScanCommand(params));

  return Items?.map((item) => ({
    id: item.id.S,
    name: item.name.S,
    timestamp: item.timestamp.S,
  }));
}
