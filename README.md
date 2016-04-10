# makeMeAform
This is my jQuery plugin to easily create forms :)

## Usage
```javascript
$("body").form({
     fields: [{
        id: "Nombre",
        type: "text",
        label: "Nombre"
     },{
        id: "Opinion",
        type:"select",
        options: ["Si","No","Ns/Nc"],
        label: "Esta a favor?"
     }]
});
```