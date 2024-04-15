// --- Footer.js -----> src/components/Footer/Footer.js
import "./Footer.css";
const template = () => `
<h3><span> Delalloreríaproject🤖 </span> </h3>
`;

export const PrintTemplateFooter = () => {
  document.querySelector("footer").innerHTML = template();
};
