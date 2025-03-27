import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

export const getProducts: APIGatewayProxyHandler = async () => {
  try{
    const params = {
      TableName: "BestSellersProducts",
    };

    const { Items } = await dynamoClient.send(new ScanCommand(params));

    const products = Items?.map((item) => ({
      id: item.id.S,
      name: item.name.S,
      timestamp: item.timestamp.S,
    }));

    return {
        statusCode: 200,
        body: JSON.stringify(products),

    };

  }catch(error){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao buscar produtos no banco"}),
    };
  }

};
