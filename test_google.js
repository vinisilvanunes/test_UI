const { chromium } = require('playwright');

(async () => {
  // Inicia o navegador Chromium em modo headless (sem interface gráfica)
  const browser = await chromium.launch({ headless: true });


const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/'
    }
  });


  // Cria uma nova página
  const page = await context.newPage();


  // Navega para a página inicial do Google
  await page.goto('https://www.google.com');
  // Encontra o elemento da caixa de pesquisa pelo atributo 'name'
  const searchBox = await page.$('[name="q"]');



  // Digita 'Celular' na caixa de pesquisa
  await searchBox.fill('y');

  // Pressiona 'Enter' para submeter a pesquisa
  await searchBox.press('Enter');

  // Aguarda até que os resultados da pesquisa sejam carregados
  await page.waitForSelector('#tools_1');

// Clica no botao ferramentas
const  ferramenta = await page.$('#tools_1');
  await ferramenta.click();

  // Opcional: tira um screenshot da página com os resultados
  await page.screenshot({ path: 'search_results.png' });

  const videos = await page.$('text=Videos');
  videos.click()

  // Fecha o navegador
  await page.waitForTimeout(5000);
  console.log(await page.title());  // Loga o título da página para verificação
  await browser.close();
})();
