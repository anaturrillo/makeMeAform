# makeMeAform
This is my jQuery plugin to easily create forms :)

## Usage
When initializing the plugin you need to set the form elements you'll need.
The 'type' property will mainly define the html needed to render that portion of the form.

Though you can create your own custom types (you''ll see how in a bit) we've created some built in types with the most common features in a form.

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
### Types
* text: creates an input type text or text area according to the amount of characters you determin

## Properties

*min (num): min value
*max (num): max value
*id: element ID
*type:
*label: label element
*labelClass: label class
*wrapper: the html element to be use as
*wrapperClass: "col s6",
*wrapperParent: "div",
*wrapperParentClass: "row",
*class: "validate",
*placeholder: "Ej.: Pepe Pepez",

## Requirements
JqueryUI v. 1.11+

## Defaut Types
