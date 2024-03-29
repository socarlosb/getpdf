const puppeteer = require("puppeteer");

const checkArguments = () => {
  if (process.argv.length > 2) return process.argv[2];
};

const cleanUpUrl = url => {
  const cleanUrl = url.toLowerCase();
  if (!cleanUrl.includes("https://") && !cleanUrl.includes("http://")) {
    return `http://${cleanUrl}`;
  }
  return cleanUrl;
};

exports.start = url => {
  const arg = checkArguments();
  if (!arg) {
    console.error(
      "No arguments provided, provide a full url (https://example.com)!"
    );
    return;
  }

  toPdf(arg.toLowerCase());
};

const toPdf = async rawUrl => {
  const url = cleanUpUrl(rawUrl);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url);
    await page.screenshot({ path: `website.png`, fullPage: true });
    await page.pdf({ path: `website.pdf`, format: "A4" });
    await browser.close();
    console.info(`Files created: website.pdf, website.png`);
  } catch (error) {
    await browser.close();
    console.error(
      "There was some kind of error, please let us know so we can put our monkeys to work!"
    );
  }
};
