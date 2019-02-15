'use strict';

class Tree {

    constructor(conteinerName) {
        this.init(conteinerName);
    }

    init(conteinerName) {
        const tree = document.getElementById(conteinerName);
        if (!tree || !window.TreeAPI) {
            console.error('elements not inited');
            return;
        }

        window.TreeAPI.getData()
            .then(res => {
                this.data = res.data;
                this.createFirstUl(tree);
                this.render();
            })
            .catch(error => console.error(error));
    }

    createFirstUl(root) {
        this.firstUl = document.createElement("ul");
        this.firstUl.addEventListener("click", e => {
            if (e.target.id === "cross") {
                this.deleteItem(e.target.dataset.id);

            }
            if (e.target.id === "plus") {
                this.addItem(e.target.dataset.id);

            }
        });

        root.appendChild(this.firstUl);
    }

    render() {
        this.data.sort((a, b) => (a.id > b.id ? 1 : -1));
       
        this.data.forEach(item => {
            if (item.parent === null && item !== "") {
                this.firstUl.innerHTML += this.createBlock(item.id);
                const blockLiNode = document.querySelector(`#li${item.id}`);
                blockLiNode.innerHTML += this.createUlOfChilds(item.id);
            } else if (item) {
                const parentBlock = document.querySelector(`#childs${item.parent}`);
                if (parentBlock !== null) {
                    parentBlock.innerHTML += this.createBlock(item.id);
                    const blockLiNode = document.querySelector(`#li${item.id}`);
                    let countOfChild = 0;
                    this.data.forEach(el => {
                        if (el.parent === item.id) countOfChild++;
                    });
                    if (countOfChild > 0)
                        blockLiNode.innerHTML += this.createUlOfChilds(item.id);
                }
            }
        });
    }

    createBlock(blockId) {
        return `
                <li id="li${blockId}">
                    <a href="#" class="block" data-id="${blockId}">${blockId}
                      <div id="cross" data-id="${blockId}">&#10006;</div>
                      <div id="plus" data-id="${blockId}">&#10010;</div>
                    </a>
      
                </li>
            `;
    }

    createUlOfChilds(parentId) {
        return `
                <ul id="childs${parentId}"></ul>
            `;
    }

    addItem(parentId) {
        this.data.push({
            id: this.data.length + 1,
            parent: parentId
        });
        this.firstUl.innerHTML = "";
        this.render();
    }

    deleteItem(itemId) {
        this.data.splice(this.data.indexOf(this.data.find(item => item.id === itemId)), 1);
        this.firstUl.innerHTML = "";
        this.render();
    }

}
window.Tree = Tree;
