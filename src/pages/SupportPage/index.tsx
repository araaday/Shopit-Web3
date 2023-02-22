import FAQ, { class_name as faq_class_name } from "./FAQ";
import FAQs from "./FAQs.json";
import Searchbar from "../../components/Searchbar";
import { class_name as dropdown_class_name } from "../../components/Dropdown";

import "./index.css";

function getResults(query: string) {
  const results = [];

  let max_l = 5;
  let l = FAQs.FAQarray.length;
  for (let i = 0; i < l; i++) {
    const result = FAQs.FAQarray[i];
    if (!result.q.toLowerCase().includes(query.toLowerCase())) continue;

    results.push(
      <a
        className="bg-white fs-5 pb-2 pt-1 px-3 text-decoration-none"
        href={`#${dropdown_class_name}-${faq_class_name}-${i}`}
        key={i}
      >
        {result.q}
      </a>
    );
    max_l--;

    if (!max_l) break;
  }

  return results;
}

export default function SupportPage() {
  return (
    <main className="d-flex flex-column justify-content-center mx-auto px-md-4 px-lg-5 py-5 w-50">
      <div className="d-flex flex-wrap w-100">
        <h2 className="w-100">Frequently Asked Questions</h2>
        <Searchbar
          className="bg-white border border-secondary faq-searchbar mb-4 px-3 py-1 rounded-2 shadow-sm text-dark"
          getResults={getResults}
          id="faq"
          placeholder="Search FAQs..."
        />
      </div>
      <div className="d-flex flex-column gap-3 w-100">
        {FAQs.FAQarray.map((props, i) => (
          <FAQ i={i} key={i} {...props} />
        ))}
      </div>
    </main>
  );
}
