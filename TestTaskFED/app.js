const main = document.querySelector("#main");
let data = [];

function render(arr) {
  arr.forEach(item => {
    if (item.parent === null && item !== "") {
      main.innerHTML += createBlock(item.id);
      const blockLiNode = document.querySelector(`#li${item.id}`);
      blockLiNode.innerHTML += createUlOfChilds(item.id);
    } else if (item) {
      const parentBlock = document.querySelector(`#childs${item.parent}`);
      if (parentBlock !== null) {
        parentBlock.innerHTML += createBlock(item.id);
        const blockLiNode = document.querySelector(`#li${item.id}`);
        let countOfChild = 0;
        arr.forEach(el => {
          if (el.parent === item.id) countOfChild++;
        });
        if (countOfChild > 0)
          blockLiNode.innerHTML += createUlOfChilds(item.id);
      }
    }
  });
}

function createBlock(blockId) {
  return `
          <li id="li${blockId}">
              <a href="#" data-id="${blockId}">${blockId}</a>
          </li>
      `;
}

function createUlOfChilds(parentId) {
  return `
          <ul id="childs${parentId}"></ul>
      `;
}

window.TreeAPI.getData().then(z => {
  data = z.data;
  render(data);
});

main.addEventListener("click", e => {
  if (e.target.dataset.id) {
    data.splice(
      data.indexOf(data.find(item => item.id === e.target.dataset.id)),
      1
    );
    main.innerHTML = "";
    render(data);
  }
});
