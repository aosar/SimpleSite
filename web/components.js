const BasicWebPage = ({title, subtitle, body}) => `
  <head><title>${title}</title></head>
  <body style='font-family: Arial, Helvetica, sans-serif;'>
    <div style="text-align: center;">
      <h1> ${title} </h1>
      <h4> ${subtitle} </h4>
      ${body.join('') || ''}
    </div>
  </body>
`;

// Redirect button
const RdrBtn = (displayText, rdrUrl) => `
  <button
    onclick="location.href='${rdrUrl}'"
    type="button"
    style="font-size: 1.75em; padding: .5em; margin: .5em;"
  >
    ${displayText}
  </button>`;


const Image = (imgUrl) => ` <img src="${imgUrl}" alt="Sample pic" height="42" width="42"> `; 

module.exports = {
  BasicWebPage,
  RdrBtn,
  Image
};