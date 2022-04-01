<section class="shoppinglist">
<div>
    <h1>My shopping list</h1>

<div>
<label for="item">Enter a new item:</label>
<input type="text" name="item" id="item">
    <button>Add item</button>
</div>

<ul>

</ul>
</section>

const list = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', () => {
const myItem = input.value;
input.value = '';

const listItem = document.createElement('li');
const listText = document.createElement('span');
const listBtn = document.createElement('button');

listItem.appendChild(listText);
listText.textContent = myItem;
listItem.appendChild(listBtn);
listBtn.textContent = 'Delete';
list.appendChild(listItem);

listBtn.addEventListener('click', () => {
list.removeChild(listItem);
});

input.focus();
});