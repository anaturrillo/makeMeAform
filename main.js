$(document).ready(function(){
  $("body").form({
    fields: [{
      id: "Nombre",
      type: "text",
      label: "Nombre",
      labelClass: "col s6",
      wrapper: "div",
      wrapperClass: "col s6",
      wrapperParent: "div",
      wrapperParentClass: "row",
      class: "validate",
      placeholder: "Ej.: Pepe Pepez",
      min: 1,
      max: 25
    },{
      id: "Opinion",
      type:"optionsDropdown",
      options: ["Si","No","Ns/Nc"],
      label: "Esta a favor?"
    },{
      id: "form",
      type: "form",
      class: "col s12"
    }]
  });
});