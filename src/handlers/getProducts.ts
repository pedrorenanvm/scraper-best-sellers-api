import { APIGatewayProxyHandler } from "aws-lambda";
import { getProducts } from "../services/dynamoService";


export const handler: APIGatewayProxyHandler = async () => {
  try{
    const products = await getProducts();

    return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Produtos Encontrados",
          data: products
        }),
    };

  }catch(error){
    console.log("Erro ao buscar produtos", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro interno do servidor"}),
    };
  }

};
