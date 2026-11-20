import { test } from "node:test";
import assert from "node:assert/strict";
import { EMPTY_VALUES } from "./options.ts";
import { buildSubmission, readHutk } from "./hubspot.ts";

const page = { pageUri: "https://app.englishpusher.in.ua/#trial-lesson", pageName: "Englishpusher App" };

test("readHutk finds the hubspotutk cookie among others", () => {
  assert.equal(readHutk("_ga=GA1.1.5; hubspotutk=abc123; __hssc=1"), "abc123");
  assert.equal(readHutk("hubspotutk=first"), "first");
});

test("readHutk returns undefined when the cookie is missing", () => {
  assert.equal(readHutk("_ga=GA1.1.5; xhubspotutk=nope"), undefined);
  assert.equal(readHutk(""), undefined);
});

test("buildSubmission sends every filled field, trimmed, goals joined with ;", () => {
  const body = buildSubmission(
    {
      firstname: " Anna ",
      email: "anna@gmail.com ",
      level: "B1 – Intermediate",
      goals: ["speaking", "travel"],
      messenger: " @anna ",
      message: "Evenings, please",
    },
    { ...page, hutk: "abc123" },
  );
  assert.deepEqual(body, {
    fields: [
      { objectTypeId: "0-1", name: "firstname", value: "Anna" },
      { objectTypeId: "0-1", name: "email", value: "anna@gmail.com" },
      { objectTypeId: "0-1", name: "english_level", value: "B1 – Intermediate" },
      { objectTypeId: "0-1", name: "learning_goals", value: "speaking;travel" },
      { objectTypeId: "0-1", name: "messenger_contact", value: "@anna" },
      { objectTypeId: "0-1", name: "message", value: "Evenings, please" },
    ],
    context: { ...page, hutk: "abc123" },
  });
});

test("buildSubmission leaves out empty optional fields and a missing hutk", () => {
  const body = buildSubmission({ ...EMPTY_VALUES, firstname: "Anna", email: "anna@gmail.com", message: "  " }, page);
  assert.deepEqual(body, {
    fields: [
      { objectTypeId: "0-1", name: "firstname", value: "Anna" },
      { objectTypeId: "0-1", name: "email", value: "anna@gmail.com" },
    ],
    context: page,
  });
  assert.equal("hutk" in body.context, false);
});

test("readHutk does not throw on a malformed value", () => {
  assert.equal(readHutk("hubspotutk=%E0%A4%A"), "%E0%A4%A");
});
