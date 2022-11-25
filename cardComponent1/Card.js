const movieData = [
  {
    title: "Sing Street",
    date: "2016",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjEzODA3MDcxMl5BMl5BanBnXkFtZTgwODgxNDk3NzE@._V1_.jpg",
    tags: ["all", "music"],
  },
  {
    title: "Tenet",
    date: "2020",
    image: "http://img.movist.com/?img=/x00/05/32/55_p1.jpg",
    tags: ["all", "action", "sf"],
  },
  {
    title: "Ant-man",
    date: "2015",
    image: "https://i.ebayimg.com/images/g/pvoAAOSwvk9Zgo1i/s-l1600.jpg",
    tags: ["all", "fantasy", "adventure"],
  },
  {
    title: "Ant-man and the wasp",
    date: "2018",
    image:
      "https://www.scifinow.co.uk/wp-content/uploads/2018/06/antman_and_the_wasp_ver10_xxlg-768x1115.jpg",
    tags: ["all", "fantasy", "adventure"],
  },
  {
    title: "Big Fish",
    date: "2003",
    image:
      "http://image.cine21.com/cine21/poster/2021/0406/12_10_39__606bd12f95ec9.jpg",
    tags: ["all", "fantasy", "drama"],
  },
  {
    title: "Interstellar",
    date: "2014",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    tags: ["all", "adventure", "sf"],
  },
  {
    title: "Little Forest",
    date: "2018",
    image: "http://img.movist.com/?img=/x00/04/90/83_p1.jpg",
    tags: ["all", "drama"],
  },
  {
    title: "Call Me by Your Name",
    date: "2017",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDk3NTEwNjc0MV5BMl5BanBnXkFtZTgwNzYxNTMwMzI@._V1_FMjpg_UX1000_.jpg",
    tags: ["all", "drama", "romance"],
  },
];

// 모든 card component를 포함하는 최상위 태그
const resources = document.querySelector("#resourcesContainer");
// card component의 부모 노드
const template = document.querySelector("template");
// 버튼에 해당하는 모든 태그
const btnFilter = document.querySelectorAll(".btnFilter");

// 처음 보여줄 category 초기값 all
let category = "all";
let filteredDataResources = [];

// tag 버튼 클릭 시 호출 되는 함수
function fillResourcesContainer() {
  //기존 선택되었던 category font의 bold 효과 clear
  buttonStyleClear(category);
  //category 변수를 클릭 된 버튼의 id로 초기화
  category = this.id;
  //선택된 category의 font bold 효과
  buttonBolder(category);
  // 기존 html의 내용을 비우고
  clearContainer(resources);
  // 새로운 리스트를 보여준다
  filterResources(category);
}
//선택된 버튼의 font weight 적용
function buttonBolder(category) {
  var clickedButton = document.getElementById(category);
  clickedButton.style.fontWeight = 800;
}
//이전에 선택했던 버튼의 font weight 적용 없애기
function buttonStyleClear(category) {
  var clickedButton = document.getElementById(category);
  clickedButton.style.fontWeight = 500;
}

// 매개변수로 들어온 container의 innerHtml을 ""로 초기화
function clearContainer(container) {
  container.innerHTML = "";
}

// 현재 선택 된 카테고리에 대한 영화만 가져오는 함수
function filterResources(category) {
  // movieData 중 category에 해당되는 요소만 뽑아 filteredDataResources에 저장
  filteredDataResources = movieData.filter((resourceData) => {
    //resourceData의 tag 목록에 category가 포함된 경우
    if (resourceData.tags.includes(category)) {
      // copyTemplateCard 함수를 통해 card conponent를 만들어 resourceCard에 저장
      const resourceCard = createCard(resourceData);
      //resources 태그의 자식태그로 append
      resources.appendChild(resourceCard);
    }
  });
}

filterResources(category);

//new card component를 만들어내는 함수
function createCard(resourceData) {
  // template태그 내 모든  자식 노드까지 복사하여 resourceTemplate 변수에 저장한다.
  const resourceTemplate = document.importNode(template.content, true);
  // resourceTemplate 내 id가 card-container인 태그를 변수 card에 저장한다.
  const card = resourceTemplate.querySelector("#card-container");

  //id가 title인 태그의 innerText 지정
  const title = card.querySelector("#title");
  title.innerText = resourceData.title;

  //id가 date 태그의 innerText 지정
  const date = card.querySelector("#date");
  date.innerText = resourceData.date;

  //id가 image인 태그의 src 지정
  const image = card.querySelector("#image");
  image.src = resourceData.image;

  //id가 tagsContainer인 태그 가져오기
  const tagsContainer = card.querySelector("#tagsContainer");

  //resourceData의 tags 배열 순회
  resourceData.tags.map((resourceDataTag) => {
    // resourceDataTag에 대해 span 태그 생성
    const individualTag = document.createElement("span");
    // resourceDataTag가 all이 아닌 경우
    if (resourceDataTag !== "all") {
      //span의 innerHTML을 resourceDataTag로 초기화
      individualTag.innerHTML = `#${resourceDataTag}`;
      //tagsContainer의 자식 요소로 붙여넣기
      tagsContainer.appendChild(individualTag);
    }
  });
  return card;
}

// 버튼 클릭 시 fillResourcesContainer 함수 호출
btnFilter.forEach(function (btn) {
  btn.addEventListener("click", fillResourcesContainer);
});
