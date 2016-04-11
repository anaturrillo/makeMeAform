$(document).ready(function(){
  $("#form").form({
    fields: [{
      id: "Nombre",
      type: "text",
      label: "Nombre",
      wrapper: "div",
      wrapperClass: "col s12 input-field",
      class: "validate",
      max: 25,
      icon: 'mode_edit',
      iconClass: 'pink-text prefix'
    },{
      id: "Descripcion",
      type: "text",
      wrapper: "div",
      wrapperClass: "col s12 input-field",
      class: "validate materialize-textarea",
      label: "Texto largo",
      placeholder: "This is a pretty large text, so we think is safe to asume you might be in the need of a textarea",
      max: 2500
    },{
      id: 'encuesta',
      type: 'optionsDropdown',
      options: {
        'Choose your option': '',
        'yes':1,
        'no': 2,
        "I don't know": 3
      },
      wrapper: "div",
      wrapperClass: "col s12",
      optionClass: 'option',
      label: 'Encuesta',
      firstOptClass: 'disabled selected'
    },{
      id: 'encuesta2',
      type: 'optionsButtons',
      options: {
        'yes':1,
        'no': 2,
        "I don't know": 3
      },
      wrapper: "div",
      wrapperClass: "col s12 input-field",
      optionClass: 'waves-effect waves-light btn',
      label: 'Encuesta',
      buttonElement: 'a'
    }]
  });

  $('select').material_select();
});
