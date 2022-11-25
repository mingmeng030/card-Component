const template = document.createElement("template");
template.innerHTML = `
    <style>
        #movie-card {
            background-color: rgb(233, 233, 233);
            width: 200px;
            height: 310px;
            border-radius: 20px;
            text-align: center;
            margin: 0 auto;
            margin : 10px;
        }
      
        #name{
            font-size : 16px;
            padding-top: 15px;
            font-weight: bold;        
        }

        #date{
            font-size : 14px;
            line-Height : 10px;
        }

        #image{
            height: 180px;
        }

        #tagsContainer {
            height: 40px;
            vertical-align: middle;
        }

        #tagsContainer span {
          position: relative;
          top: 10px;
          padding: 5px;
          margin: 3px;
          background-color: rgb(255, 255, 255);
          border-radius: 5px;
          font-size: 14px;
        }   
    </style>

    <div id="movie-card">
        <p id="name"></p>
        <p id="date"></p>
        <img id="image"></img>
        <div id="tagsContainer"></div>
    </div>        
`;

class Card extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.getElementById("name").innerText =
      this.getAttribute("name");

    this.shadowRoot.getElementById("date").innerText =
      this.getAttribute("date");

    this.shadowRoot.getElementById("image").src = this.getAttribute("image");

    const tagArray = this.getAttribute("tags").split("'");
    const tagsContainer = this.shadowRoot.getElementById("tagsContainer");
    console.log(tagArray);

    for (let i = 1; i < tagArray.length / 2; i++) {
      const tag = document.createElement("span");
      if (tagArray[i * 2 - 1] !== "all") {
        tag.innerHTML = `#${tagArray[i * 2 - 1]}`;
        tagsContainer.appendChild(tag);
      }
    }
  }
}
window.customElements.define("movie-card", Card);
