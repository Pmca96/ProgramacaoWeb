
    var myDropzone = new Dropzone("div#uploader", {url: "/upload"});


    var contactosList = [
        {
            label: "Barbina",
            value: "ba",
        },
        {
            label: "Bigoli",
            value: "bg",
        },
        {
            label: "Bucatini",
            value: "bu",
        },
        {
            label: "Busiate",
            value: "bus",
        },
        {
            label: "Capellini",
            value: "cp",
        },
        {
            label: "Fedelini",
            value: "fe",
        },
        {
            label: "Maccheroni",
            value: "ma",
        },
        {
            label: "Spaghetti",
            value: "sp",
        },
    ];

    contactos = new SelectPure("#contactos", {
        options: contactosList,
        multiple: true,
        autocomplete: true,
        disabled: true,
        icon: "fa fa-times",
        classNames: {
            select: "select-pure__select",
            dropdownShown: "select-pure__select--opened",
            multiselect: "select-pure__select--multiple",
            label: "select-pure__label",
            placeholder: "select-pure__placeholder",
            dropdown: "select-pure__options",
            option: "select-pure__option",
            autocompleteInput: "select-pure__autocomplete",
            selectedLabel: "select-pure__selected-label",
            selectedOption: "select-pure__option--selected",
            placeholderHidden: "select-pure__placeholder--hidden",
            optionHidden: "select-pure__option--hidden",
        }
    });