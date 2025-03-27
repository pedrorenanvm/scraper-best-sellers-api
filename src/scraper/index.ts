import puppeteer from "puppeteer";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const dynamoCLient = new DynamoDBClient({ region: "us-east-1" });

export async function getBestSellers() {
  const url = "https://www.amazon.com.br/bestsellers/";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36"
  );


  await page.goto(url, { waitUntil: "networkidle2", timeout: 0});

  await page.waitForSelector(".p13n-sc-truncate-desktop-type2", { timeout: 5000 }); 

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".p13n-sc-truncate-desktop-type2"))
      .slice(0,3)
      .map((el) => ({
        name : el.textContent?.trim() || "Nome não encontrado",
      }));
  });

  await browser.close();
  
  for (const product of products ){
    const params = {
      TableName: "BestSellersProducts",
      Item: {
        id: { S: uuidv4()},
        name: { S: product.name},
      timestamp: { S: new Date().toISOString()},
      },
    };

    await dynamoCLient.send(new PutItemCommand(params));
  }

  console.log("Produtos salvos com sucesso no DynamoDB!");

}
  
if(require.main === module) {
    getBestSellers()
      .then(console.log)
      .catch(console.error);
}