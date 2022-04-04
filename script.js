var slist = {
      // Start Shopping List
      items : [],   // current shopping list
      hform : null, // add item form
      hitem : null, // add item input field
      hadd : null,  // add submit button
      hlist : null, // <div> shopping list
      init : () => {
        // HTML Elements
        slist.hform = document.getElementById("shop-form");
        slist.hitem = document.getElementById("shop-item");
        slist.hadd = document.getElementById("shop-add");
        slist.hlist = document.getElementById("shop-list");
    
        // Activate Add items List
        slist.hitem.setAttribute("autocomplete", "off");
        slist.hform.onsubmit = slist.add;
        slist.hitem.disabled = false;
        slist.hadd.disabled = false;
    
        // Restore Previous List
        if (localStorage.items == undefined) { localStorage.items = "[]"; }
        slist.items = JSON.parse(localStorage.items);
    
        // Draw Shopping List
        slist.draw();
      },
    
      // Save Shopping List Into Local Storage
      save : () => {
        if (localStorage.items == undefined) { localStorage.items = "[]"; }
        localStorage.items = JSON.stringify(slist.items);
      },
    
      // Add New Item To List
      add : (evt) => {
        // Prevent Form Submit
        evt.preventDefault();
    
        // Add New Item To List
        slist.items.push({
          name : slist.hitem.value, 
          done : false 
        });
        slist.hitem.value = "";
        slist.save();
    
        // Redraw HTML Shopping List
        slist.draw();
      },
    
      // Delete Item
      delete : (id) => { if (confirm("Remove this item?")) {
        slist.items.splice(id, 1);
        slist.save();
        slist.draw();
      }},
    
      // Toggle "GOT IT" OR "NOT YET"
      toggle : (id) => {
        slist.items[id].done = !slist.items[id].done;
        slist.save();
        slist.draw();
      },
    
      // The html Shpping List
      draw : () => {
        // Reset List
        slist.hlist.innerHTML = "";
    
        // No Items
        if (slist.items.length == 0) {
          slist.hlist.innerHTML = "<div class='item-row item-name'>No items found.</div>";
        }
    
        // Draw Items
        else {
          for (let i in slist.items) {
            // Item Row
            let row = document.createElement("div");
            row.className = "item-row";
            slist.hlist.appendChild(row);
    
            // Item Name
            let name = document.createElement("div");
            name.innerHTML = slist.items[i].name;
            name.className = "item-name";
            if (slist.items[i].done) { name.classList.add("item-got"); }
            row.appendChild(name);
    
            // Delete Button
            let del = document.createElement("input");
            del.className = "item-del";
            del.type = "button";
            del.value = "Delete";;
            del.onclick = () => { slist.delete(i); };
            row.appendChild(del);
    
            // Completed/Not Yet
            let ok = document.createElement("input");
            ok.className = "item-ok";
            ok.type = "button";
            ok.value = slist.items[i].done ? "Not Yet" : "Got It";
            ok.onclick = () => { slist.toggle(i); };
            row.appendChild(ok);
          }
        }
      }
    };
    window.addEventListener("load", slist.init);