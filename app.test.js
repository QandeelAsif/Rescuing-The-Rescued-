const lead = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    message: faker.random.words()
  };

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });
  afterAll(() => {
    browser.close();
  });

  describe("Contact form", () => {
    test("lead can submit a contact request", async () => {
      await page.goto(APP);
      await page.waitForSelector("[data-test=contact-form]");
      await page.click("input[name=name]");
      await page.type("input[name=name]", lead.name);
      await page.click("input[name=email]");
      await page.type("input[name=email]", lead.email);
      await page.click("input[name=tel]");
      await page.type("input[name=tel]", lead.phone);
      await page.click("textarea[name=message]");
      await page.type("textarea[name=message]", lead.message);
      await page.click("input[type=checkbox]");
      await page.click("button[type=submit]");
      await page.waitForSelector(".modal");
    }, 16000);
  });