// Storage Controller


// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [
            {id:0, name: 'Steak Dinner', calories: 1200},
            {id:1, name: 'Cookie', calories: 400},
            {id:2, name: 'Eggs', calories: 300},
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        getItems: function(){
            return data.items;
        },
        addItems: function(name, calories){
            let ID;
            // create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            const newItem = new Item(ID, name, calories);

            data.items.push(newItem);
            return newItem
        },
        logData: function(){
            return data;
        }
    }

})();


// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }
    // Public methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                        </a>
                    </li>
                `;
            })

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();


// App Controller
const App = (function(ItemCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // Add Item Submit
    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // Add Item
            const newItem = ItemCtrl.addItems(input.name, input.calories);
        }
        e.preventDefault();
    }

    // Public methods
    return {
        init: function(){
            // Fetch items from data staructure
            const items = ItemCtrl.getItems();

            // Populate list with items
            UICtrl.populateItemList(items);

            // load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);



// Initializing App
App.init();