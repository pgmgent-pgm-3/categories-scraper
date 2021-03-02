/** imports */
const fetch = require("node-fetch");

/** constants */
const API_KEY = "REPLACE-THIS-WITH-PERSONAL-API-TOKEN";
const API_URL = "https://quizapi.io/api/v1/questions";
const AMOUNT_OF_BRUTE_FETCH_ITERATIONS = 20;

/** fetch the maximum amount of questions **/
const fetchRandomQuestions = async () => {
  const url = new URL(API_URL);
  url.searchParams.set("apiKey", API_KEY);
  url.searchParams.set("limit", 20);

  const response = await fetch(url);
  const questions = await response.json();

  return questions;
};

/** filter categories from the given questions **/
const filterCategoriesFromQuestions = (questions, categories) => {
  questions.forEach((question) => {
    const category = question.category;
    const ignore = ["", "uncategorized"];
    if (!categories.includes(category) && !ignore.includes(category)) {
      categories.push(category);
    }
  });
};

/** scrape questions */
const scrape = async () => {
  let questions = [];
  for (let i = 0; i < AMOUNT_OF_BRUTE_FETCH_ITERATIONS; i++) {
    const fetchedQuestions = await fetchRandomQuestions();
    questions.push(...fetchedQuestions);
  }

  console.log(`Brute force fetched ${questions.length} questions`);

  let categories = [];
  filterCategoriesFromQuestions(questions, categories);

  console.log(`Filtered ${categories.length} categories`);
  console.log("Categories:");
  console.log(categories);
};

scrape();
