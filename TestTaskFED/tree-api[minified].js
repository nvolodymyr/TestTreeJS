!function () {
    var n = {
        data: [{
            id: "1", parent: null
        }
            ,
        {
            id: "2", parent: "1"
        }
            ,
        {
            id: "3", parent: "1"
        }
            ,
        {
            id: "4", parent: "3"
        }
            ,
        {
            id: "5", parent: "3"
        }
            ,
        {
            id: "6", parent: "3"
        }
            ,
        {
            id: "7", parent: "4"
        },
        ]
    }
        ;
    window.TreeAPI = {
        getData: function () {
            return new Promise(function (t) {
                setTimeout(function () {
                    t(n)
                }
                    , 1e3 * Math.random())
            }
            )
        }
    }
}
    ();


window.TreeAPI.getData().then(z => {
    render(z.data);
});


function render(arr) {
    const main = document.querySelector("#main");
    arr.forEach(item => {
        if (item.parent === null) {
            main.innerHTML += createBlock(item.id);
            const blockLiNode = document.querySelector(`#li${item.id}`);
            blockLiNode.innerHTML += createUlOfChilds(item.id);
        } else {
            const parentBlock = document.querySelector(`#childs${item.parent}`);
            parentBlock.innerHTML += createBlock(item.id);
            const blockLiNode = document.querySelector(`#li${item.id}`);
            let countOfChild = 0;
            arr.forEach(el => {
                if (el.parent === item.id) countOfChild++;
            });
            if (countOfChild > 0) blockLiNode.innerHTML += createUlOfChilds(item.id);
        }
    });
}
function createUlOfChilds(parentId) {
    return `
          <ul id="childs${parentId}"></ul>
      `;
}
function createBlock(blockId) {
    return `
          <li id="li${blockId}">
              <a href="#">${blockId}</a>
          </li>
      `;
}


